// API helper functions for frontend to use
// These functions replace localStorage calls

const API_BASE = "/api";

export const api = {
  // Blogs
  async getBlogs(published?: boolean) {
    const url = published !== undefined 
      ? `${API_BASE}/blogs?published=${published}` 
      : `${API_BASE}/blogs`;
    const res = await fetch(url);
    const data = await res.json();
    return data.blogs || [];
  },

  async getBlog(id: string) {
    const res = await fetch(`${API_BASE}/blogs/${id}`);
    const data = await res.json();
    return data.blog;
  },

  async saveBlog(blog: any) {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });
    return res.json();
  },

  async deleteBlog(id: string) {
    const res = await fetch(`${API_BASE}/blogs?id=${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  // Newsletter
  async getSubscribers() {
    const res = await fetch(`${API_BASE}/newsletter/subscribers`);
    const data = await res.json();
    return data.subscribers || [];
  },

  async addSubscriber(email: string, date: string, subscribedAt: string) {
    const res = await fetch(`${API_BASE}/newsletter/subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, date, subscribedAt }),
    });
    return res.json();
  },

  // Contact
  async getContactSubmissions() {
    const res = await fetch(`${API_BASE}/contact/submissions`);
    const data = await res.json();
    return data.submissions || [];
  },

  async saveContactSubmission(submission: any) {
    const res = await fetch(`${API_BASE}/contact/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    return res.json();
  },

  // Jobs
  async getJobPositions(published?: boolean) {
    const url = published !== undefined 
      ? `${API_BASE}/jobs/positions?published=${published}` 
      : `${API_BASE}/jobs/positions`;
    const res = await fetch(url);
    const data = await res.json();
    return data.positions || [];
  },

  async saveJobPosition(position: any) {
    const res = await fetch(`${API_BASE}/jobs/positions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(position),
    });
    return res.json();
  },

  async deleteJobPosition(id: string) {
    const res = await fetch(`${API_BASE}/jobs/positions?id=${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  async getJobApplications(positionId?: string) {
    const url = positionId 
      ? `${API_BASE}/jobs/applications?positionId=${positionId}` 
      : `${API_BASE}/jobs/applications`;
    const res = await fetch(url);
    const data = await res.json();
    return data.applications || [];
  },

  async saveJobApplication(application: any) {
    const res = await fetch(`${API_BASE}/jobs/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });
    return res.json();
  },

  // Feedback
  async getFeedbackSubmissions(type?: string, status?: string) {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (status) params.append("status", status);
    const url = `${API_BASE}/feedback${params.toString() ? `?${params}` : ""}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.submissions || [];
  },

  async saveFeedbackSubmission(submission: any) {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
    return res.json();
  },

  async updateFeedbackStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    return res.json();
  },

  async deleteFeedbackSubmission(id: string) {
    const res = await fetch(`${API_BASE}/feedback?id=${id}`, {
      method: "DELETE",
    });
    return res.json();
  },

  async voteOnFeedback(submissionId: string, userIdentifier: string) {
    const res = await fetch(`${API_BASE}/feedback/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId, userIdentifier }),
    });
    return res.json();
  },

  async addFeedbackComment(comment: any) {
    const res = await fetch(`${API_BASE}/feedback/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    return res.json();
  },
};

