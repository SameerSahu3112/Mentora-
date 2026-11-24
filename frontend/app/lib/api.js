"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://mentora-1-gkgq.onrender.com/api/v1';

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
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
      throw new Error(errorText || `Request failed: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${path}`, error);
    throw error;
  }
}

export const authAPI = {
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  signup: (data) => apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  me: () => apiRequest('/auth/me'),
};

export const coursesAPI = {
  getAll: () => apiRequest('/courses/'),
  getById: (id) => apiRequest(`/api/v1/courses/${id}`),
};

export const batchesAPI = {
  getAll: () => apiRequest('/batches/'),
};

export const enrollmentsAPI = {
  getAll: () => apiRequest('/enrollments/student/enrollments'),
};

export const resourcesAPI = {
  getAll: () => apiRequest('/student/resources'),
};

export const mentorshipAPI = {
  getBookings: () => apiRequest('/mentorship/bookings'),
  getSessions: (batchId) => apiRequest(`/mentorship/sessions/upcoming/${batchId}`),
};

export const adminAPI = {
  getStudents: () => apiRequest('/admin/users/'),
  getTeachers: () => apiRequest('/admin/teachers/'),
  getCourses: () => apiRequest('/courses/'),
  getBatches: () => apiRequest('/batches/'),
  getApplications: () => apiRequest('/admin/applications/'),
  getEnrollments: () => apiRequest('/admin/enrollments/'),
  getPayments: () => apiRequest('/admin/payments/'),
  getResources: () => apiRequest('/admin/resources/'),
  getMentorshipBookings: () => apiRequest('/mentorship/bookings/'),
  getAuditLogs: () => apiRequest('/admin/audit-logs/'),
};
