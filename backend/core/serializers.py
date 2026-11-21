from rest_framework import serializers
from .models import (
    Department, Doctor, Patient, Appointment,
    MedicalRecord, Prescription, Invoice, HospitalContent,
    ChatConversation, ChatMessage
)

class DepartmentSerializer(serializers.ModelSerializer):
    doctors_count = serializers.SerializerMethodField()

    class Meta:
        model = Department
        fields = '__all__'

    def get_doctors_count(self, obj):
        return obj.doctors.count()

class DoctorSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    appointments_count = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = '__all__'

    def get_appointments_count(self, obj):
        return obj.appointments.count()

class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    patient_age = serializers.IntegerField(source='patient.age', read_only=True)
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    doctor_specialty = serializers.CharField(source='doctor.specialty', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'

    def validate(self, data):
        # Slot conflict validation per SRS FR-APT-02
        doctor = data.get('doctor')
        slot_date = data.get('slot_date')
        slot_time = data.get('slot_time')
        
        existing = Appointment.objects.filter(
            doctor=doctor,
            slot_date=slot_date,
            slot_time=slot_time
        ).exclude(status='Cancelled')

        if self.instance:
            existing = existing.exclude(pk=self.instance.pk)

        if existing.exists():
            raise serializers.ValidationError(
                f"Doctor {doctor.name} already has an active appointment on {slot_date} at {slot_time}. Please select another slot."
            )
        return data

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'

class MedicalRecordSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    clinician_name = serializers.CharField(source='clinician.name', read_only=True)
    prescriptions = PrescriptionSerializer(many=True, read_only=True)

    class Meta:
        model = MedicalRecord
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.name', read_only=True)

    class Meta:
        model = Invoice
        fields = '__all__'

class HospitalContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalContent
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'role', 'text', 'timestamp']

class ChatConversationSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatConversation
        fields = ['conversation_id', 'title', 'owner_role', 'session_id', 'created_at', 'messages']
