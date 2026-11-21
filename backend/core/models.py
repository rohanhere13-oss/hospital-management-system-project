import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.TextChoices):
    ADMIN = 'admin', 'Administrator'
    STAFF = 'staff', 'Receptionist / Staff'
    DOCTOR = 'doctor', 'Doctor / Clinician'
    PATIENT = 'patient', 'Patient'
    VISITOR = 'visitor', 'Visitor'

class Department(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField()
    location = models.CharField(max_length=200, default='Main Block, Wing A')
    hours = models.CharField(max_length=100, default='24/7 or 8:00 AM - 8:00 PM')
    head = models.CharField(max_length=120, blank=True, default='')
    icon = models.CharField(max_length=50, default='Heart')

    def __str__(self):
        return self.name

class Doctor(models.Model):
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('On duty', 'On duty'),
        ('Unavailable', 'Unavailable'),
    ]

    doctor_id = models.CharField(max_length=50, unique=True, default=uuid.uuid4)
    name = models.CharField(max_length=120)
    specialty = models.CharField(max_length=120)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='doctors')
    qualification = models.CharField(max_length=200, default='MBBS, MD')
    experience_years = models.IntegerField(default=8)
    contact = models.CharField(max_length=50, default='+1 (555) 019-2834')
    email = models.EmailField(blank=True)
    availability = models.CharField(max_length=200, default='Sat - Thu | 5:00 PM - 9:00 PM')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Available')
    image_url = models.CharField(max_length=500, blank=True)
    is_featured = models.BooleanField(default=False)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - {self.specialty}"

class Patient(models.Model):
    patient_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=120)
    age = models.IntegerField(default=30)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, default='Female')
    contact = models.CharField(max_length=50)
    address = models.CharField(max_length=250, blank=True)
    blood_group = models.CharField(max_length=10, default='O+')
    emergency_contact = models.CharField(max_length=100, blank=True)
    avatar_url = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.patient_id})"

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Requested', 'Requested'),
        ('Confirmed', 'Confirmed'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
        ('Rescheduled', 'Rescheduled'),
    ]

    appointment_id = models.CharField(max_length=50, unique=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='appointments')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    slot_date = models.DateField()
    slot_time = models.CharField(max_length=30, default='11:30 AM')
    disease_reason = models.CharField(max_length=200, default='General Checkup')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Confirmed')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Prevent active booking conflict on same doctor, date, time
        # Per SRS FR-APT-02
        unique_together = ('doctor', 'slot_date', 'slot_time')

    def __str__(self):
        return f"{self.appointment_id}: {self.patient.name} with {self.doctor.name}"

class MedicalRecord(models.Model):
    record_id = models.CharField(max_length=50, unique=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='records')
    clinician = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)
    encounter_date = models.DateField(auto_now_add=True)
    diagnosis = models.CharField(max_length=250)
    notes = models.TextField()
    vitals = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Record {self.record_id} for {self.patient.name}"

class Prescription(models.Model):
    prescription_id = models.CharField(max_length=50, unique=True)
    medical_record = models.ForeignKey(MedicalRecord, on_delete=models.CASCADE, related_name='prescriptions')
    medication = models.CharField(max_length=200)
    dosage = models.CharField(max_length=100)
    instructions = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.medication} - {self.dosage}"

class Invoice(models.Model):
    STATUS_CHOICES = [
        ('Paid', 'Paid'),
        ('Pending', 'Pending'),
        ('Overdue', 'Overdue'),
    ]

    invoice_id = models.CharField(max_length=50, unique=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='invoices')
    appointment = models.ForeignKey(Appointment, on_delete=models.SET_NULL, null=True, blank=True)
    items_summary = models.CharField(max_length=250, default='Consultation & Diagnostic Fees')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=150.00)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invoice {self.invoice_id} - ${self.total} ({self.status})"

class HospitalContent(models.Model):
    """
    Approved knowledge context for Gemini AI chatbot grounding.
    Per SRS FR-BOT-02, FR-BOT-08.
    """
    CATEGORY_CHOICES = [
        ('overview', 'Hospital Overview & Contact'),
        ('departments', 'Departments & Services'),
        ('doctors', 'Doctors & Specialists'),
        ('visiting_hours', 'Visiting Hours & Policies'),
        ('appointments', 'Appointment Procedures & Booking'),
        ('facilities', 'Facilities & Emergency Wing'),
        ('faq', 'Frequently Asked Questions'),
    ]

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    title = models.CharField(max_length=200)
    body = models.TextField()
    approved = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.category}] {self.title}"

class ChatConversation(models.Model):
    conversation_id = models.CharField(max_length=80, unique=True)
    owner_role = models.CharField(max_length=30, default='visitor')
    session_id = models.CharField(max_length=100, default='default-session')
    title = models.CharField(max_length=200, default='Hospital Inquiry')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.conversation_id})"

class ChatMessage(models.Model):
    conversation = models.ForeignKey(ChatConversation, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=20, choices=[('user', 'User'), ('assistant', 'Assistant')])
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"[{self.role}] {self.text[:40]}"
