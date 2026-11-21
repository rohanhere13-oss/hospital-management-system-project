# 🏥 Medcare Hospital Management System with AI Chatbot

A comprehensive web-based Hospital Management System (HMS) developed with **ReactJS**, **Django REST Framework**, and **Google Gemini API**, built strictly adhering to the **Software Requirements Specification (SRS v1.0)** and replicating the reference UI.

---

## 🌟 Key Features

### 1. 🖥️ Pixel-Accurate Medcare UI
Replicates the dashboard from the reference specification:
- **Header**: "Welcome back, Dr, Robert!" with *Export to CSV*, *Generate Report*, and timeframe selector.
- **Top Bar**: Search bar with internal button, Theme toggle, Notification badges, and Owner profile pill.
- **4 Metrics Cards**:
  - **Total Patients** (148, +24% vs last week, blue curved sparkline).
  - **Appointments Today** (96, +14% vs last week, daily bar chart with active blue indicator and Avg pill).
  - **Pending Reports** (96, +48% lab reports, segmented progress bar).
  - **Total Revenue** ($54,24.05, wavy area curve with `+$32k` tooltip pill).
- **Patient Arrival Statistics**: Area spline curve with cross-hatching, months Jan-Oct, highlighted vertical bar, and floating tooltip:
  - *December-2025: Patients In 350 | Patients Out 211*
- **Appointments Table**: Horizontal calendar day selector (1-23) with highlighted active days (13, 14), appointment details, fever badges, and actions.
- **Our Specialist**: Featured card for **Dr. Salman Hossain** (Cardiologist, MBBS, MD) and active doctor roster with availability status badges.

---

### 2. 🤖 Gemini AI Chatbot with Strict Guardrails (SRS Section 8)
- **Persona**: Warm, cheerful, polite, and concise hospital assistant.
- **Scope Restriction**: Confined strictly to hospital departments, doctors, services, visiting hours, appointment guidelines, facilities, contacts, and FAQs.
- **Medical Safety Refusal**: Rejects symptom diagnosis and prescriptions; directs urgent cases to local emergency services or Medcare's 24/7 ER.
- **Identity & Prompt Protection**: Defends against system prompt extraction and model disclosure requests.
- **Grounding (RAG)**: Uses approved database hospital knowledge as context.
- **Intelligent Fallback**: Graceful fallback if Gemini API is unreachable or times out (FR-BOT-11).

---

### 3. 👥 Role-Based Access Control (RBAC)
Role switcher to simulate permissions for:
1. **Administrator**: Platform content and hospital directory management.
2. **Receptionist / Staff**: Patient registration and appointment scheduling.
3. **Doctor / Clinician**: View patients, schedules, and clinical records.
4. **Patient**: View appointments, personal bills, and profile.
5. **Public Visitor**: Browse hospital directory and interact with the AI Chatbot.

---

## 🚀 Quick Start Guide

### 1. Run Migrations & Seed Database
```powershell
cd backend
python manage.py makemigrations core
python manage.py migrate
python manage.py seed_data
```

### 2. Start Both Backend & Frontend
Run the all-in-one runner:
```powershell
python run_servers.py
```
Or run individually:
- **Backend**:
  ```powershell
  cd backend
  python manage.py runserver 0.0.0.0:8000
  ```
- **Frontend**:
  ```powershell
  cd frontend
  npm.cmd run dev
  ```

Open your browser at: **[http://localhost:5173](http://localhost:5173)**

---

## 🔑 Gemini API Configuration (Optional)
Create a `.env` file in the `backend/` directory or project root:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*Note: If no key is set, the system seamlessly runs in grounded fallback mode satisfying all SRS test cases (BOT-01 to BOT-10).*
