// src/services/api.js
// Flask-க்கு call பண்ற function — புதுசா create பண்ணு

const BASE_URL = 'https://tajmahal-acwebiste-5.onrender.com/api';

export async function submitBooking(formData) {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Booking failed. Please try again.');
  }
  return data;
}