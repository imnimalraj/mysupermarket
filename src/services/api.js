// API endpoints configuration
const API_ENDPOINTS = {
  AUTH: '/api/auth',
  PRODUCTS: '/api/products',
  STORES: '/api/stores',
  INVENTORY: '/api/inventory',
  ORDERS: '/api/orders',
  USERS: '/api/users'
};

// Helper function for making authenticated requests
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth service
export const authService = {
  login: (credentials) => fetchWithAuth(`${API_ENDPOINTS.AUTH}/login`, {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  signup: (userData) => fetchWithAuth(`${API_ENDPOINTS.AUTH}/register`, {
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  getAllUsers: () => fetchWithAuth(`${API_ENDPOINTS.USERS}`),

  getUser: (id) => fetchWithAuth(`${API_ENDPOINTS.USERS}/${id}`),

  validateToken: (token) => fetchWithAuth(`${API_ENDPOINTS.AUTH}/validate`, {
    headers: { Authorization: `Bearer ${token}` }
  })
};

// Store service
export const storeService = {
  getAll: () => fetchWithAuth(API_ENDPOINTS.STORES),
  getById: (id) => fetchWithAuth(`${API_ENDPOINTS.STORES}/${id}`),
  create: (data) => fetchWithAuth(API_ENDPOINTS.STORES, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchWithAuth(`${API_ENDPOINTS.STORES}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchWithAuth(`${API_ENDPOINTS.STORES}/${id}`, {
    method: 'DELETE'
  }),
  getPendingStores: () => fetchWithAuth(`${API_ENDPOINTS.STORES}/pending`),
  approveStore: (id) => fetchWithAuth(`${API_ENDPOINTS.STORES}/${id}/approve`, {
    method: 'PUT'
  })
};

// Product service
export const productService = {
  getAll: () => fetchWithAuth(API_ENDPOINTS.PRODUCTS),
  getById: (id) => fetchWithAuth(`${API_ENDPOINTS.PRODUCTS}/${id}`),
  create: (data) => fetchWithAuth(API_ENDPOINTS.PRODUCTS, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchWithAuth(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  delete: (id) => fetchWithAuth(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
    method: 'DELETE'
  })
};

// Order service
export const orderService = {
  getAll: () => fetchWithAuth(API_ENDPOINTS.ORDERS),
  getById: (id) => fetchWithAuth(`${API_ENDPOINTS.ORDERS}/${id}`),
  create: (data) => fetchWithAuth(API_ENDPOINTS.ORDERS, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  update: (id, data) => fetchWithAuth(`${API_ENDPOINTS.ORDERS}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  getByStore: (storeId) => fetchWithAuth(`${API_ENDPOINTS.ORDERS}/store/${storeId}`)
};

// Inventory service
export const inventoryService = {
  getByStore: (storeId) => fetchWithAuth(`${API_ENDPOINTS.INVENTORY}/store/${storeId}`),
  updateQuantity: (id, quantity) => fetchWithAuth(`${API_ENDPOINTS.INVENTORY}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity })
  }),
  create: (data) => fetchWithAuth(API_ENDPOINTS.INVENTORY, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}; 