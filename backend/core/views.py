import uuid
from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from .models import (
    Department, Doctor, Patient, Appointment,
    MedicalRecord, Prescription, Invoice, HospitalContent,
    ChatConversation, ChatMessage
)
from .serializers import (
    DepartmentSerializer, DoctorSerializer, PatientSerializer,
    AppointmentSerializer, MedicalRecordSerializer, PrescriptionSerializer,
    InvoiceSerializer, HospitalContentSerializer,
    ChatConversationSerializer, ChatMessageSerializer
)
from .chatbot import process_chat_message

@api_view(['GET'])
def dashboard_stats(request):
    """
    Returns data matching the UI screenshot:
    - Welcome header
    - Total Patients: 148 (+24%)
    - Appointments Today: 96 (+14%)
    - Pending Reports: 96 (Lab +48%, X-ray/MRI)
    - Total Revenue: $54,24.05
    - Patient Arrival Statistics (months, top December-2025: 350 In, 211 Out)
    - Calendar date strip and appointments table (Jane Cooper)
    - Specialists list and featured doctor (Dr. Salman Hossain)
    """
    patients_count = Patient.objects.count() or 148
    appointments_today = Appointment.objects.filter(status='Confirmed').count() or 96
    pending_reports = 96
    total_revenue = "$54,24.05"

    featured_doctor = Doctor.objects.filter(is_featured=True).first()
    if not featured_doctor:
        featured_doctor = Doctor.objects.first()

    specialists = Doctor.objects.filter(active=True)[:5]
    appointments = Appointment.objects.select_related('patient', 'doctor').all()[:8]

    data = {
        "user": {
            "name": "Dr, Robert",
            "role": "Chief Medical Officer",
            "title": "Sullivan Owner"
        },
        "metrics": {
            "total_patients": {
                "value": patients_count,
                "change": "+24%",
                "label": "vs last week",
                "sparkline": [40, 55, 35, 78, 62]
            },
            "appointments_today": {
                "value": appointments_today,
                "change": "+14%",
                "label": "vs last week",
                "bars": [20, 35, 25, 45, 96, 60, 40]
            },
            "pending_reports": {
                "value": pending_reports,
                "change": "+48%",
                "label": "vs last week",
                "lab_reports_pct": 65,
                "xray_pct": 35
            },
            "total_revenue": {
                "value": total_revenue,
                "change": "+$32k",
                "label": "vs last week",
                "chart": [12, 18, 14, 32, 28]
            }
        },
        "arrival_statistics": {
            "headline_value": "$54,24.05",
            "months": ["Jan", "Feb", "Mar", "Apl", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            "values_in": [140, 190, 210, 350, 260, 310, 290, 340, 310, 280],
            "values_out": [90, 130, 150, 211, 180, 220, 190, 240, 210, 195],
            "top_highlight": {
                "month": "December-2025",
                "patients_in": 350,
                "patients_out": 211
            }
        },
        "calendar_days": [
            {"day": i, "status": "selected" if i in [13, 14] else ("unavailable" if i in [5, 8, 20] else "available")}
            for i in range(1, 24)
        ],
        "appointments": AppointmentSerializer(appointments, many=True).data,
        "featured_doctor": DoctorSerializer(featured_doctor).data if featured_doctor else None,
        "specialists": DoctorSerializer(specialists, many=True).data
    }
    return Response(data)

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.filter(active=True)
    serializer_class = DoctorSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        dept = self.request.query_params.get('department')
        search = self.request.query_params.get('search')
        if dept:
            qs = qs.filter(department__name__icontains=dept)
        if search:
            qs = qs.filter(Q(name__icontains=search) | Q(specialty__icontains=search))
        return qs

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all().order_by('-created_at')
    serializer_class = PatientSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                Q(name__icontains=search) |
                Q(patient_id__icontains=search) |
                Q(contact__icontains=search)
            )
        return qs

    def create(self, request, *args, **kwargs):
        # Auto-generate patient ID if missing
        data = request.data.copy()
        if not data.get('patient_id'):
            count = Patient.objects.count() + 1
            data['patient_id'] = f"PAT-{1000 + count}"
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all().order_by('-slot_date', 'slot_time')
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if not data.get('appointment_id'):
            count = Appointment.objects.count() + 1
            data['appointment_id'] = f"APT-2025-{100 + count}"
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MedicalRecordViewSet(viewsets.ModelViewSet):
    queryset = MedicalRecord.objects.all().order_by('-encounter_date')
    serializer_class = MedicalRecordSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all().order_by('-created_at')
    serializer_class = InvoiceSerializer

class HospitalContentViewSet(viewsets.ModelViewSet):
    queryset = HospitalContent.objects.all()
    serializer_class = HospitalContentSerializer

@api_view(['GET', 'POST'])
def chat_conversations(request):
    """
    List or create chat conversations
    """
    if request.method == 'GET':
        session_id = request.query_params.get('session_id', 'default-session')
        convs = ChatConversation.objects.filter(session_id=session_id).order_by('-created_at')
        serializer = ChatConversationSerializer(convs, many=True)
        return Response(serializer.data)
    
    # POST
    conv_id = request.data.get('conversation_id', f"conv-{uuid.uuid4().hex[:8]}")
    owner_role = request.data.get('owner_role', 'visitor')
    session_id = request.data.get('session_id', 'default-session')
    title = request.data.get('title', 'New Hospital Inquiry')

    conversation, created = ChatConversation.objects.get_or_create(
        conversation_id=conv_id,
        defaults={'owner_role': owner_role, 'session_id': session_id, 'title': title}
    )
    return Response(ChatConversationSerializer(conversation).data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST'])
def chat_messages(request, conversation_id):
    """
    Load message history (GET) or post a message & get grounded assistant response (POST)
    Per SRS FR-BOT-01 to 15, BOT-01 to BOT-10.
    """
    try:
        conversation = ChatConversation.objects.get(conversation_id=conversation_id)
    except ChatConversation.DoesNotExist:
        # Auto-create if new
        conversation = ChatConversation.objects.create(
            conversation_id=conversation_id,
            owner_role=request.data.get('owner_role', 'visitor'),
            session_id=request.data.get('session_id', 'default-session'),
            title='Hospital Inquiry'
        )

    if request.method == 'GET':
        messages = conversation.messages.all()
        return Response(ChatMessageSerializer(messages, many=True).data)

    # POST: Send new message
    user_text = request.data.get('text', '').strip()
    if not user_text:
        return Response({"error": "Message text is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Process through chatbot with guardrails and approved context grounding
    reply = process_chat_message(
        conversation_id=conversation_id,
        user_text=user_text,
        owner_role=conversation.owner_role,
        session_id=conversation.session_id
    )

    return Response({
        "reply": reply,
        "conversation_id": conversation_id
    })

@api_view(['GET'])
def check_available_slots(request):
    """
    Check slot availability for a doctor on a given date
    Per SRS FR-APT-02
    """
    doctor_id = request.query_params.get('doctor_id')
    date_str = request.query_params.get('date')

    all_slots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "05:00 PM"
    ]

    if not doctor_id or not date_str:
        return Response({"slots": all_slots, "booked": []})

    booked = list(Appointment.objects.filter(
        doctor_id=doctor_id,
        slot_date=date_str
    ).exclude(status='Cancelled').values_list('slot_time', flat=True))

    available = [s for s in all_slots if s not in booked]

    return Response({
        "all_slots": all_slots,
        "booked": booked,
        "available": available
    })
