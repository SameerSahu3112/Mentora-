"use client";

export const API_URL = "/api/v1";

export async function request(path, options = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_URL}${normalizedPath}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = `Request failed: ${response.status}`;
    try {
      const parsed = JSON.parse(errorText);
      if (typeof parsed?.title === "string") {
        message = parsed.title;
      } else if (typeof parsed?.detail === "string") {
        message = parsed.detail;
      } else if (Array.isArray(parsed?.detail) && parsed.detail[0]?.msg) {
        message = parsed.detail[0].msg;
      }
    } catch {
      if (errorText) message = errorText;
    }
    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

export const apiRequest = request;

export const authAPI = {
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  signup: (data) => request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),
};

export const coursesAPI = {
  getAll: () => request("/courses/"),
  getById: (id) => request(`/courses/${id}`),
  create: (data) => request("/courses/", { method: "POST", body: JSON.stringify(data) }),
};

export const batchesAPI = {
  getAll: () => request("/batches/"),
  create: (data) => request("/batches/", { method: "POST", body: JSON.stringify(data) }),
};

export const enrollmentsAPI = {
  getAll: () => request("/enrollments/student/enrollments"),
};

export const resourcesAPI = {
  getAll: () => request("/resources/student/resources"),
};

export const mentorshipAPI = {
  getBookings: () => request("/mentorship/bookings"),
  getSessions: (batchId) => request(`/mentorship/sessions/upcoming/${batchId}`),
};

export const teacherAPI = {
  getMyBatches: () => request("/batches/teacher/my-batches"),
  getSessions: () => request("/mentorship/sessions"),
  getBookings: () => request("/mentorship/bookings"),
  updateBooking: (id, data) =>
    request(`/mentorship/bookings/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  getAttendance: () => request("/mentorship/attendance"),
  markAttendance: (data) =>
    request("/mentorship/attendance", { method: "POST", body: JSON.stringify(data) }),
  createResource: (data) =>
    request("/resources/teacher/resources", { method: "POST", body: JSON.stringify(data) }),
  publishResource: (id) =>
    request(`/resources/teacher/resources/${id}/publish`, { method: "POST" }),
};

export const adminAPI = {
  getStudents: () => request("/users/admin/students"),
  getTeachers: () => request("/users/admin/teachers"),
  createTeacher: (data) =>
    request("/auth/admin/teachers", { method: "POST", body: JSON.stringify(data) }),
  getCourses: () => request("/courses/?active_only=false"),
  createCourse: (data) => request("/courses/", { method: "POST", body: JSON.stringify(data) }),
  getBatches: () => request("/batches/?active_only=false"),
  createBatch: (data) => request("/batches/", { method: "POST", body: JSON.stringify(data) }),
  getApplications: () => request("/applications/admin/applications"),
  decideApplication: (id, data) =>
    request(`/applications/admin/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  getEnrollments: () => request("/enrollments/admin/enrollments"),
  activateEnrollment: (data) =>
    request("/enrollments/admin/enrollments/activate", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  rejectEnrollment: (id, reason = "") =>
    request(`/enrollments/admin/enrollments/${id}/reject?reason=${encodeURIComponent(reason)}`, {
      method: "POST",
    }),
  cancelEnrollment: (id, reason = "") =>
    request(`/enrollments/admin/enrollments/${id}/cancel?reason=${encodeURIComponent(reason)}`, {
      method: "POST",
    }),
  getPayments: () => request("/enrollments/admin/payments"),
  recordPayment: (data) =>
    request("/enrollments/admin/payments", { method: "POST", body: JSON.stringify(data) }),
  verifyPayment: (id) =>
    request(`/enrollments/admin/payments/${id}/verify`, { method: "PUT" }),
  getResources: () => request("/resources/admin/resources"),
  unpublishResource: (id) =>
    request(`/resources/admin/resources/${id}/unpublish`, { method: "PUT" }),
  getMentorshipBookings: () => request("/mentorship/bookings"),
  getApprovals: () => request("/approvals/pending"),
  voteApproval: (id, data) =>
    request(`/approvals/${id}/vote`, { method: "POST", body: JSON.stringify(data) }),
  getAuditLogs: () => request("/approvals/audit-logs"),
};
