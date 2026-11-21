import datetime
from django.core.management.base import BaseCommand
from core.models import Department, Doctor, Patient, Appointment, MedicalRecord, Prescription, Invoice, HospitalContent

class Command(BaseCommand):
    help = 'Seed Medcare Hospital initial database with UI mock data and SRS knowledge base'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding Medcare Hospital database...")

        # 1. Departments
        cardio, _ = Department.objects.get_or_create(
            name="Cardiology",
            defaults={
                "description": "Comprehensive cardiac diagnostic, catheterization, and clinical management.",
                "location": "Main Block, Wing A, 2nd Floor",
                "hours": "24/7 Emergency; OPD 8:00 AM - 6:00 PM",
                "head": "Dr. Salman Hossain",
                "icon": "Heart"
            }
        )
        neuro, _ = Department.objects.get_or_create(
            name="Neurology",
            defaults={
                "description": "Advanced care for neurological disorders, stroke management, and spinal health.",
                "location": "Main Block, Wing B, 3rd Floor",
                "hours": "Mon-Sat 9:00 AM - 5:00 PM",
                "head": "Dr. Sarah Jenkins",
                "icon": "Brain"
            }
        )
        pediatrics, _ = Department.objects.get_or_create(
            name="Pediatrics",
            defaults={
                "description": "Child health, preventive vaccinations, and pediatric emergency services.",
                "location": "Children's Pavilion, Wing C, 1st Floor",
                "hours": "24/7 Pediatric Triage",
                "head": "Dr. Michael Chen",
                "icon": "Baby"
            }
        )
        ortho, _ = Department.objects.get_or_create(
            name="Orthopedics",
            defaults={
                "description": "Bone, joint replacement, sports injury rehabilitation, and trauma reconstruction.",
                "location": "Surgical Block, Ground Floor",
                "hours": "Mon-Fri 8:30 AM - 4:30 PM",
                "head": "Dr. Eleanor Pena",
                "icon": "Bone"
            }
        )
        emergency, _ = Department.objects.get_or_create(
            name="Emergency & Trauma",
            defaults={
                "description": "Level 1 Trauma Center with 24/7 dedicated acute care physicians and ICU beds.",
                "location": "Emergency Wing, Ground Floor (Direct Ambulance Bay)",
                "hours": "24 Hours / 7 Days a Week",
                "head": "Dr. Robert Sullivan",
                "icon": "ShieldAlert"
            }
        )

        # 2. Doctors
        salman, _ = Doctor.objects.get_or_create(
            doctor_id="DOC-101",
            defaults={
                "name": "Dr. Salman Hossain",
                "specialty": "Cardiologist",
                "department": cardio,
                "qualification": "MBBS, MD (Cardiology)",
                "experience_years": 14,
                "contact": "+1 (555) 019-2834",
                "email": "salman.hossain@medcare.org",
                "availability": "Sat - Thu | 5:00 PM - 9:00 PM",
                "status": "Available",
                "is_featured": True,
                "active": True,
                "image_url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
            }
        )
        eleanor, _ = Doctor.objects.get_or_create(
            doctor_id="DOC-102",
            defaults={
                "name": "Dr. Eleanor Pena",
                "specialty": "Cardiology",
                "department": cardio,
                "qualification": "MBBS, MD (Cardiology)",
                "experience_years": 10,
                "contact": "+1 (555) 019-2835",
                "email": "eleanor.pena@medcare.org",
                "availability": "Mon - Fri | 9:00 AM - 3:00 PM",
                "status": "Available",
                "is_featured": False,
                "active": True,
                "image_url": "https://images.unsplash.com/photo-1594824813583-a4c3f5e55e5b?auto=format&fit=crop&q=80&w=200"
            }
        )
        esther, _ = Doctor.objects.get_or_create(
            doctor_id="DOC-103",
            defaults={
                "name": "Dr. Esther Howard",
                "specialty": "Cardiology",
                "department": cardio,
                "qualification": "MBBS, MD (Cardiology)",
                "experience_years": 8,
                "contact": "+1 (555) 019-2836",
                "email": "esther.howard@medcare.org",
                "availability": "Daily | 8:00 AM - 4:00 PM",
                "status": "On duty",
                "is_featured": False,
                "active": True,
                "image_url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
            }
        )
        theresa, _ = Doctor.objects.get_or_create(
            doctor_id="DOC-104",
            defaults={
                "name": "Dr. Theresa Webb",
                "specialty": "Cardiology",
                "department": cardio,
                "qualification": "MBBS, MD (Cardiology)",
                "experience_years": 11,
                "contact": "+1 (555) 019-2837",
                "email": "theresa.webb@medcare.org",
                "availability": "Tue - Sat | 10:00 AM - 6:00 PM",
                "status": "Available",
                "is_featured": False,
                "active": True,
                "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=200"
            }
        )
        jacob, _ = Doctor.objects.get_or_create(
            doctor_id="DOC-105",
            defaults={
                "name": "Dr. Jacob Alex",
                "specialty": "Cardiology",
                "department": cardio,
                "qualification": "MBBS, MD (Cardiology)",
                "experience_years": 9,
                "contact": "+1 (555) 019-2838",
                "email": "jacob.alex@medcare.org",
                "availability": "Mon - Thu | 1:00 PM - 7:00 PM",
                "status": "Available",
                "is_featured": False,
                "active": True,
                "image_url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200"
            }
        )

        # 3. Patients
        jane, _ = Patient.objects.get_or_create(
            patient_id="PAT-1001",
            defaults={
                "name": "Jane Cooper",
                "age": 28,
                "dob": datetime.date(1997, 4, 15),
                "gender": "Female",
                "contact": "+1 (555) 234-5678",
                "address": "452 Maple Street, Central City",
                "blood_group": "A+",
                "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
            }
        )
        wade, _ = Patient.objects.get_or_create(
            patient_id="PAT-1002",
            defaults={
                "name": "Wade Warren",
                "age": 42,
                "dob": datetime.date(1983, 8, 22),
                "gender": "Male",
                "contact": "+1 (555) 345-6789",
                "address": "789 Pine Ridge Ave",
                "blood_group": "O+",
                "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
            }
        )

        # 4. Appointments
        apt1, _ = Appointment.objects.get_or_create(
            appointment_id="APT-2025-001",
            defaults={
                "patient": jane,
                "doctor": eleanor,
                "department": cardio,
                "slot_date": datetime.date(2025, 12, 25),
                "slot_time": "11:30 AM",
                "disease_reason": "Fever",
                "status": "Confirmed",
                "notes": "Patient reporting low grade fever and mild fatigue."
            }
        )
        apt2, _ = Appointment.objects.get_or_create(
            appointment_id="APT-2025-002",
            defaults={
                "patient": wade,
                "doctor": salman,
                "department": cardio,
                "slot_date": datetime.date(2025, 12, 25),
                "slot_time": "05:30 PM",
                "disease_reason": "Cardiovascular Checkup",
                "status": "Confirmed",
                "notes": "Routine annual ECG follow-up."
            }
        )

        # 5. Billing & Invoices
        Invoice.objects.get_or_create(
            invoice_id="INV-2025-089",
            defaults={
                "patient": jane,
                "appointment": apt1,
                "items_summary": "Consultation, Blood Panel, Rapid Viral Screen",
                "total": 185.00,
                "status": "Paid",
                "due_date": datetime.date(2025, 12, 25)
            }
        )
        Invoice.objects.get_or_create(
            invoice_id="INV-2025-090",
            defaults={
                "patient": wade,
                "appointment": apt2,
                "items_summary": "Specialist Consultation & Echocardiogram",
                "total": 320.00,
                "status": "Pending",
                "due_date": datetime.date(2025, 12, 28)
            }
        )

        # 6. Approved Hospital Content for Gemini RAG grounding (FR-BOT-02, 08)
        content_items = [
            ("overview", "Medcare Hospital Overview & Mission",
             "Medcare Hospital is a premier multi-specialty healthcare institution dedicated to excellence in patient-centered clinical care, innovative medical technology, and medical research. Located at 742 Evergreen Healthcare Blvd, Central City. General Phone: +1 (555) 019-2834, Emergency Line: +1 (555) 019-9999 (24/7)."),
            ("departments", "Approved Hospital Departments",
             "Medcare Hospital currently operates 5 primary departments:\n1. Cardiology (Block A, 2nd Floor): Full diagnostic, cardiac catheterization, rhythm disorder management.\n2. Neurology (Block B, 3rd Floor): Stroke unit, epilepsy care, neuro-rehabilitation.\n3. Pediatrics (Block C, 1st Floor): Neonatal ICU, adolescent medicine, comprehensive pediatric outpatient care.\n4. Orthopedics (Block D, Ground Floor): Joint replacements, sports injury arthroscopy, bone trauma care.\n5. Emergency & Trauma (Block E, Ground Floor): 24/7 acute trauma, triage, and critical resuscitation."),
            ("doctors", "Approved Specialists and Clinical Faculty",
             "Our authorized doctors include:\n- Dr. Salman Hossain: Lead Cardiologist (MBBS, MD Cardiology). Availability: Sat - Thu, 5:00 PM - 9:00 PM.\n- Dr. Eleanor Pena: Cardiologist & Interventionalist (MBBS, MD Cardiology). Availability: Mon - Fri, 9:00 AM - 3:00 PM.\n- Dr. Esther Howard: Clinical Cardiologist (MBBS, MD Cardiology). Availability: Daily, 8:00 AM - 4:00 PM.\n- Dr. Theresa Webb: Cardiologist (MBBS, MD Cardiology). Availability: Tue - Sat, 10:00 AM - 6:00 PM.\n- Dr. Jacob Alex: Associate Cardiologist (MBBS, MD Cardiology). Availability: Mon - Thu, 1:00 PM - 7:00 PM.\n- Dr. Robert Sullivan: Chief Medical Officer & Internal Medicine Director."),
            ("visiting_hours", "Visiting Hours and Guest Guidelines",
             "General Inpatient Wards: Daily 4:00 PM - 8:00 PM. Maximum 2 visitors per patient at any time.\nIntensive Care Units (ICU/CCU): 11:00 AM - 12:00 PM and 5:00 PM - 6:00 PM (Immediate family only).\nPediatric Wing: One parent/guardian is permitted 24/7 bedside stay.\nEmergency Room: 24/7 patient escort allowed per clinical discretion."),
            ("appointments", "Appointment Procedure and Booking",
             "Patients and staff can schedule appointments directly via the Medcare online portal, at the reception desk, or by dialing +1 (555) 019-2834. Standard consultations run in 30-minute slots. Please arrive 15 minutes prior to scheduled time with photo ID and insurance cards."),
            ("facilities", "Facilities, Diagnostic Labs & Pharmacy",
             "Facilities include: 24/7 In-house Pharmacy (Ground Floor), 3T MRI & 128-Slice CT Imaging Suite, Automated Pathology and Biochemistry Laboratories, 8 Laminar-Flow Operating Theaters, and Cafeteria open 7:00 AM - 10:00 PM."),
            ("faq", "Frequently Asked Questions & Hospital Policies",
             "Q: Where is parking located?\nA: Visitor parking is in Garage P1 and P2 with 2 hours complimentary parking for patients.\nQ: What payment methods are accepted?\nA: All major debit/credit cards, wire transfers, and verified healthcare insurance plans.\nQ: How do I access lab reports?\nA: Reports are uploaded to your Medcare Patient Portal within 24 hours of test completion.")
        ]

        for cat, title, body in content_items:
            HospitalContent.objects.update_or_create(
                title=title,
                defaults={"category": cat, "body": body, "approved": True}
            )

        self.stdout.write(self.style.SUCCESS("Medcare Hospital successfully seeded!"))
