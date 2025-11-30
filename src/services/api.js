const API_URL = 'http://localhost:8080/api';

export const api = {
  // Produtos
  async getProducts() {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  async getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  async getProductsByCategory(category) {
    const response = await fetch(`${API_URL}/products/category/${category}`);
    return response.json();
  },

  async getProductsByBadge(badge) {
    const response = await fetch(`${API_URL}/products/badge/${badge}`);
    return response.json();
  },

  async searchProducts(query) {
    const response = await fetch(`${API_URL}/products/search?q=${query}`);
    return response.json();
  },

  async createProduct(productData) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Erro ao cadastrar produto');
    }
    return response.json();
  },

  async updateProduct(id, productData) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  async deleteProduct(id) {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  },

  // Usuários
  async register(userData) {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  async getUserById(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  async updateUser(id, userData) {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Pedidos
  async createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  },

  async getOrderById(id) {
    const response = await fetch(`${API_URL}/orders/${id}`);
    return response.json();
  },

  async getOrdersByUserId(userId) {
    const response = await fetch(`${API_URL}/orders/user/${userId}`);
    return response.json();
  },

  async updateOrderStatus(id, status) {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};
