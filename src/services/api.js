import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') ||
  'http://localhost:8080/api';

export const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return 'http://localhost:8080';
  }
})();

export const STATIC_BASE_URL =
  import.meta.env.VITE_STATIC_BASE_URL?.replace(/\/+$/, '') || API_ORIGIN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const uploadApi = axios.create({
  baseURL: API_BASE_URL,
});

const normalizeApiResponse = (response) => {
  const apiStatus = response?.data?.status;
  if (typeof apiStatus === "number" && apiStatus >= 400) {
    const error = new Error(response?.data?.message || "Request failed");
    error.response = response;
    throw error;
  }
  return response;
};

api.interceptors.response.use(
  (response) => normalizeApiResponse(response),
  (error) => Promise.reject(error)
);

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  // ❗ auth calls ला token नको (login/register)
  if (token && !config.url.includes("/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

uploadApi.interceptors.response.use(
  (response) => normalizeApiResponse(response),
  (error) => Promise.reject(error)
);

// Admin API calls
export const adminApi = {
  // Add property
  addProperty: (adminId, propertyData) => {
    return api.post(`/admin/add-property/${adminId}`, propertyData);
  },

  // Get all properties
  getAllProperties: () => {
    return api.get('/admin/get-all-properties');
  },

  // Get property by ID
  getPropertyById: (id) => {
    return api.get(`/admin/get-property-by-id/${id}`);
  },
    
  

  // Update property
  updateProperty: (id, propertyData) => {
    return api.put(`/admin/update-property/${id}`, propertyData);
  },

  // Delete property
  deleteProperty: (id) => {
    return api.delete(`/admin/delete-property/${id}`);
  },

  // Upload property images
  uploadPropertyImages: (propertyId, formData) => {
    return uploadApi.post(`/admin/upload-property-images/${propertyId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Buy premium
  buyPremium: (adminId) => {
    return api.post(`/admin/buy-premium/${adminId}`);
  },
};

// Public API calls
export const propertyApi = {
  // Get all properties
  getAll: () => {
    return api.get('/properties/getAll');
  },

  // Filter properties
  filter: (filterData) => {
    return api.post('/properties/filter', filterData);
  },

  // Get property by ID
  getById: (id) => {
    return api.get(`/properties/${id}`);
  },
};

 export const authApi = {
  login: (data) => {
    return api.post('/auth/login', data);
  },

  registerUser: (data) => {
    return api.post('/auth/register/user', data);
  },

  registerAdmin: (data) => {
    return api.post('/auth/register/admin', data);
  },
};

export default api;