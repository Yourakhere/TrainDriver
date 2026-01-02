const API_BASE = "https://train-driver-backend.vercel.app/api";

export const API = {
  get: async (url, config) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}${url}${config?.params ? '?' + new URLSearchParams(config.params) : ''}`, {
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    });
    return { data: await response.json() };
  },
  post: async (url, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
      body: JSON.stringify(data)
    });
    return { data: await response.json() };
  },
  put: async (url, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
      body: JSON.stringify(data)
    });
    return { data: await response.json() };
  },
  delete: async (url) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE}${url}`, {
      method: 'DELETE',
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    });
  }
};

