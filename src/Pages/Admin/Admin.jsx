import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [stats, setStats] = useState({ total: 0, active: 0, removed: 0 });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Eletrônicos',
    description: '',
    image: '',
    rating: 4.5,
    reviews: 0,
    badge: '',
    stock: 0
  });
  const [imagePreview, setImagePreview] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Imagem muito grande! Máximo 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData, image: reader.result});
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (!user || !user.id) {
      navigate('/admin');
      return;
    }
    setAdminUser(user);
    loadProducts();
    loadUsers();
  }, [navigate]);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
      setStats({
        total: data.length,
        active: data.length,
        removed: 0
      });
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setUsers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação
    if (!formData.name || !formData.price) {
      alert('Preencha nome e preço do produto!');
      return;
    }
    
    if (!formData.image) {
      alert('Selecione uma imagem para o produto!');
      return;
    }
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating || 4.5),
        reviews: parseInt(formData.reviews || 0),
        stock: parseInt(formData.stock || 0)
      };
      
      console.log('Enviando produto:', productData);
      
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, productData);
        alert('Produto atualizado com sucesso!');
      } else {
        await api.createProduct(productData);
        alert('Produto cadastrado com sucesso!');
      }
      
      await loadProducts();
      
      if (showModal) closeModal();
      
      if (activeSection === 'add-product') {
        setFormData({
          name: '',
          price: '',
          category: 'Eletrônicos',
          description: '',
          image: '',
          rating: 4.5,
          reviews: 0,
          badge: ''
        });
        setImagePreview('');
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente excluir este produto?')) {
      try {
        await api.deleteProduct(id);
        loadProducts();
      } catch (error) {
        alert('Erro ao excluir produto');
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        category: 'Eletrônicos',
        description: '',
        image: '',
        rating: 4.5,
        reviews: 0,
        badge: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const handleRefresh = () => {
    loadProducts();
    loadUsers();
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <div className="section-header">
              <h2>Dashboard</h2>
              <button className="btn-refresh" onClick={handleRefresh}>🔄 Atualizar</button>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <h3>{stats.total}</h3>
                  <p>Total de Produtos</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>{stats.active}</h3>
                  <p>Produtos Ativos</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{users.length}</h3>
                  <p>Usuários</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🗑️</div>
                <div className="stat-info">
                  <h3>{stats.removed}</h3>
                  <p>Produtos Removidos</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'add-product':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Cadastrar Novo Produto</h2>
              <button className="btn-refresh" onClick={handleRefresh}>🔄 Atualizar</button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nome do Produto</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Preço (R$)</label>
                  <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Categoria</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Smartphones">Smartphones</option>
                    <option value="Notebooks">Notebooks</option>
                    <option value="Games">Games</option>
                    <option value="Áudio">Áudio</option>
                    <option value="Câmeras">Câmeras</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Badge</label>
                  <select value={formData.badge} onChange={(e) => setFormData({...formData, badge: e.target.value})}>
                    <option value="">Nenhum</option>
                    <option value="Mais Vendido">Mais Vendido</option>
                    <option value="Novidade">Novidade</option>
                    <option value="Oferta">Oferta</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantidade em Estoque</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Imagem do Produto</label>
                <div className="image-upload-container">
                  <label htmlFor="file-upload-add" className="custom-file-upload">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                    {imagePreview ? 'Alterar Imagem' : 'Selecionar Imagem'}
                  </label>
                  <input id="file-upload-add" type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button type="button" className="btn-remove-image" onClick={() => {setImagePreview(''); setFormData({...formData, image: ''});}}>×</button>
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="btn-save">Cadastrar Produto</button>
            </form>
          </div>
        );
      
      case 'products':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Produtos Cadastrados</h2>
              <div style={{display: 'flex', gap: '12px'}}>
                <button className="btn-refresh" onClick={handleRefresh}>🔄 Atualizar</button>
                <button className="btn-add" onClick={() => openModal()}>+ Novo</button>
              </div>
            </div>
            <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th>Badge</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td><img src={product.image} alt={product.name} width="50" /></td>
                <td>{product.name}</td>
                <td>R$ {product.price?.toLocaleString()}</td>
                <td>{product.category}</td>
                <td>{product.stock || 0}</td>
                <td>{product.badge || '-'}</td>
                <td>
                  <button className="btn-edit" onClick={() => openModal(product)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(product.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
            </table>
          </div>
        </div>
      );
      
      case 'users':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Usuários Cadastrados ({users.length})</h2>
              <button className="btn-refresh" onClick={handleRefresh}>🔄 Atualizar</button>
            </div>
            {users.length === 0 ? (
              <p style={{textAlign: 'center', padding: '40px', color: '#64748b'}}>Nenhum usuário cadastrado.</p>
            ) : (
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name || '-'}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || '-'}</td>
                        <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>🔧 Admin Panel</h2>
          <p>Busca Shop</p>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>
            <span className="icon">📊</span>
            Dashboard
          </button>
          <button onClick={() => setActiveSection('add-product')} className={activeSection === 'add-product' ? 'active' : ''}>
            <span className="icon">➕</span>
            Cadastrar Produto
          </button>
          <button onClick={() => setActiveSection('products')} className={activeSection === 'products' ? 'active' : ''}>
            <span className="icon">📦</span>
            Produtos Cadastrados
          </button>
          <button onClick={() => setActiveSection('users')} className={activeSection === 'users' ? 'active' : ''}>
            <span className="icon">👥</span>
            Usuários
          </button>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{adminUser?.name?.charAt(0)}</div>
            <div>
              <p className="user-name">{adminUser?.name}</p>
              <p className="user-role">Administrador</p>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
      </aside>
      
      <main className="admin-main">
        {renderContent()}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Preço</label>
                <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Notebooks">Notebooks</option>
                  <option value="Games">Games</option>
                  <option value="Áudio">Áudio</option>
                  <option value="Câmeras">Câmeras</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantidade em Estoque</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Imagem do Produto</label>
                <div className="image-upload-container">
                  <label htmlFor="file-upload-modal" className="custom-file-upload">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                    {(imagePreview || formData.image) ? 'Alterar Imagem' : 'Selecionar Imagem'}
                  </label>
                  <input id="file-upload-modal" type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} />
                  {(imagePreview || formData.image) && (
                    <div className="image-preview">
                      <img src={imagePreview || formData.image} alt="Preview" />
                      <button type="button" className="btn-remove-image" onClick={() => {setImagePreview(''); setFormData({...formData, image: ''});}}>×</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Badge</label>
                <select value={formData.badge} onChange={(e) => setFormData({...formData, badge: e.target.value})}>
                  <option value="">Nenhum</option>
                  <option value="Mais Vendido">Mais Vendido</option>
                  <option value="Novidade">Novidade</option>
                  <option value="Oferta">Oferta</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save">Salvar</button>
                <button type="button" className="btn-cancel" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
