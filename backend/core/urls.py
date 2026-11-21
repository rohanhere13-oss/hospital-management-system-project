from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    dashboard_stats, check_available_slots,
    chat_conversations, chat_messages,
    DepartmentViewSet, DoctorViewSet, PatientViewSet,
    AppointmentViewSet, MedicalRecordViewSet, InvoiceViewSet,
    HospitalContentViewSet
)

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'records', MedicalRecordViewSet)
router.register(r'invoices', InvoiceViewSet)
router.register(r'content', HospitalContentViewSet)

urlpatterns = [
    path('dashboard/stats', dashboard_stats, name='dashboard-stats'),
    path('appointments/slots', check_available_slots, name='appointment-slots'),
    path('chat/conversations', chat_conversations, name='chat-conversations'),
    path('chat/conversations/<str:conversation_id>/messages', chat_messages, name='chat-messages'),
    path('', include(router.urls)),
]
