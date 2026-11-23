"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error);
    throw error;
  }
}

// Auth
export const authService = {
  login: (data) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  signup: (data) => apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  me: () => apiRequest('/auth/me'),
};

// Courses
export const courseService = {
  getAll: () => apiRequest('/api/v1/courses/'),
  getById: (id) => apiRequest(`/api/v1/courses/${id}`),
  create: (data) => apiRequest('/api/v1/courses/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/api/v1/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/api/v1/courses/${id}`, { method: 'DELETE' }),
};

// Batches
export const batchService = {
  getAll: () => apiRequest('/api/v1/batches/'),
  getById: (id) => apiRequest(`/api/v1/batches/${id}`),
  create: (data) => apiRequest('/api/v1/batches/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/api/v1/batches/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/api/v1/batches/${id}`, { method: 'DELETE' }),
};

// Applications
export const applicationService = {
  getAll: () => apiRequest('/api/v1/admin/applications/'),
  getById: (id) => apiRequest(`/api/v1/admin/applications/${id}`),
  updateStatus: (id, status) => apiRequest(`/api/v1/admin/applications/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

// Enrollments
export const enrollmentService = {
  getAll: () => apiRequest('/api/v1/admin/enrollments/'),
  getById: (id) => apiRequest(`/api/v1/admin/enrollments/${id}`),
  activate: (id, data) => apiRequest(`/api/v1/admin/enrollments/activate`, { method: 'POST', body: JSON.stringify(data) }),
  reject: (id) => apiRequest(`/api/v1/admin/enrollments/${id}/reject`, { method: 'POST' }),
  cancel: (id) => apiRequest(`/api/v1/admin/enrollments/${id}/cancel`, { method: 'POST' }),
};

// Payments
export const paymentService = {
  getAll: () => apiRequest('/api/v1/admin/payments/'),
  create: (data) => apiRequest('/api/v1/admin/payments/', { method: 'POST', body: JSON.stringify(data) }),
  verify: (id) => apiRequest(`/api/v1/admin/payments/${id}/verify`, { method: 'PUT' }),
};

// Resources
export const resourceService = {
  getAll: () => apiRequest('/api/v1/admin/resources/'),
  create: (data) => apiRequest('/api/v1/resources/teacher/resources/', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/api/v1/teacher/resources/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  publish: (id) => apiRequest(`/api/v1/resources/teacher/resources/${id}/publish`, { method: 'POST' }),
  unpublish: (id) => apiRequest(`/api/v1/admin/resources/${id}/unpublish`, { method: 'PUT' }),
  delete: (id) => apiRequest(`/api/v1/admin/resources/${id}`, { method: 'DELETE' }),
  requestDeletion: (id, data) => apiRequest(`/api/v1/resources/teacher/resources/${id}/deletion-request`, { method: 'POST', body: JSON.stringify(data) }),
};

// Mentorship
export const mentorshipService = {
  getAllBookings: () => apiRequest('/api/v1/mentorship/bookings/'),
  approveReject: (id, data) => apiRequest(`/api/v1/mentorship/bookings/${id}/approve-or-reject`, { method: 'PUT', body: JSON.stringify(data) }),
  getAllSessions: () => apiRequest('/api/v1/mentorship/sessions/'),
  createSchedule: (data) => apiRequest('/api/v1/mentorship/weekly-schedules/', { method: 'POST', body: JSON.stringify(data) }),
};

// Approvals
export const approvalService = {
  getAll: () => apiRequest('/api/v1/admin/approvals/'),
  create: (data) => apiRequest('/api/v1/admin/approvals/', { method: 'POST', body: JSON.stringify(data) }),
  vote: (id, data) => apiRequest(`/api/v1/admin/approvals/${id}/vote`, { method: 'POST', body: JSON.stringify(data) }),
  execute: (id) => apiRequest(`/api/v1/admin/approvals/${id}/execute`, { method: 'POST' }),
  reject: (id) => apiRequest(`/api/v1/admin/approvals/${id}/reject`, { method: 'POST' }),
};

// Notifications
export const notificationService = {
  getAll: (params) => apiRequest(`/api/v1/notifications/${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  markRead: (id) => apiRequest(`/api/v1/notifications/${id}/read`, { method: 'PATCH' }),
};

// Users
export const userService = {
  getAll: () => apiRequest('/api/v1/admin/users/'),
  getById: (id) => apiRequest(`/api/v1/users/${id}`),
  createTeacher: (data) => apiRequest('/api/v1/auth/teachers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/api/v1/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};
