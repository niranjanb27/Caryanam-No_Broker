import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    return api.post(`/admin/upload-property-images/${propertyId}`, formData, {
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

export default api;
