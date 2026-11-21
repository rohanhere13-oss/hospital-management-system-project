const API_BASE = '/api';

export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE}/dashboard/stats`);
  if (!res.ok) throw new Error('Failed to fetch dashboard stats');
  return res.json();
}

export async function fetchDoctors(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/doctors/?${query}`);
  if (!res.ok) throw new Error('Failed to fetch doctors');
  return res.json();
}

export async function fetchDepartments() {
  const res = await fetch(`${API_BASE}/departments/`);
  if (!res.ok) throw new Error('Failed to fetch departments');
  return res.json();
}

export async function fetchPatients(search = '') {
  const url = search ? `${API_BASE}/patients/?search=${encodeURIComponent(search)}` : `${API_BASE}/patients/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch patients');
  return res.json();
}

export async function createPatient(data) {
  const res = await fetch(`${API_BASE}/patients/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || JSON.stringify(err));
  }
  return res.json();
}

export async function fetchAppointments() {
  const res = await fetch(`${API_BASE}/appointments/`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json();
}

export async function fetchAvailableSlots(doctorId, date) {
  const res = await fetch(`${API_BASE}/appointments/slots?doctor_id=${doctorId}&date=${date}`);
  if (!res.ok) throw new Error('Failed to fetch slots');
  return res.json();
}

export async function createAppointment(data) {
  const res = await fetch(`${API_BASE}/appointments/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    const errMsg = err.non_field_errors?.[0] || err.detail || JSON.stringify(err);
    throw new Error(errMsg);
  }
  return res.json();
}

export async function updateAppointmentStatus(id, status) {
  const res = await fetch(`${API_BASE}/appointments/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update appointment');
  return res.json();
}

export async function fetchInvoices() {
  const res = await fetch(`${API_BASE}/invoices/`);
  if (!res.ok) throw new Error('Failed to fetch invoices');
  return res.json();
}

export async function fetchHospitalContent() {
  const res = await fetch(`${API_BASE}/content/`);
  if (!res.ok) throw new Error('Failed to fetch hospital content');
  return res.json();
}

export async function saveHospitalContent(id, data) {
  const method = id ? 'PATCH' : 'POST';
  const url = id ? `${API_BASE}/content/${id}/` : `${API_BASE}/content/`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to save hospital content');
  return res.json();
}

export async function sendChatMessage(conversationId, text, ownerRole = 'visitor') {
  const res = await fetch(`${API_BASE}/chat/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, owner_role: ownerRole })
  });
  if (!res.ok) throw new Error('Failed to send chat message');
  return res.json();
}

export async function fetchChatMessages(conversationId) {
  const res = await fetch(`${API_BASE}/chat/conversations/${conversationId}/messages`);
  if (!res.ok) throw new Error('Failed to load chat history');
  return res.json();
}
