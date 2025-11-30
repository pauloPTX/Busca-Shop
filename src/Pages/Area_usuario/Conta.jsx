import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Conta.css';
import { api } from '../../services/api';

function Conta() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || ''
      });
      loadOrders();
      loadAddresses();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const loadAddresses = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/addresses/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
    }
  };
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    cep: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setShowPhotoMenu(false);
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditForm(userData);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        setUserData(editForm);
        const updatedUser = { ...user, ...editForm };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Deseja realmente cancelar este pedido?')) return;
    try {
      const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        loadOrders();
      }
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      alert('Digite sua senha para confirmar');
      return;
    }
    try {
      const loginResponse = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, password: deletePassword })
      });
      
      if (!loginResponse.ok) {
        alert('Senha incorreta!');
        setDeletePassword('');
        return;
      }
      
      const deleteResponse = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'DELETE'
      });
      
      if (deleteResponse.ok) {
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      alert('Erro ao deletar conta. Tente novamente.');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/addresses/${id}`, { method: 'DELETE' });
      loadAddresses();
    } catch (error) {
      console.error('Erro ao deletar endereço:', error);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...addressForm, userId: user.id })
      });
      setShowAddressForm(false);
      setAddressForm({ label: '', street: '', city: '', state: '', cep: '' });
      loadAddresses();
    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
    }
  };

  const getStatusClass = (status) => {
    const statusMap = {
      delivered: 'status-delivered',
      shipped: 'status-shipped',
      processing: 'status-processing'
    };
    return statusMap[status];
  };

  const getStatusText = (status) => {
    const textMap = {
      delivered: 'Entregue',
      shipped: 'Enviado',
      processing: 'Processando',
      pending: 'Pendente'
    };
    return textMap[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="content-header">
              <h1 className="content-title">Dashboard</h1>
              <p className="content-subtitle">Bem-vindo de volta! Aqui está um resumo da sua conta.</p>
            </div>
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <div className="card-number">{orders.length}</div>
                <div className="card-label">Pedidos Realizados</div>
              </div>
              <div className="dashboard-card">
                <div className="card-number">{orders.filter(o => o.status !== 'delivered').length}</div>
                <div className="card-label">Em Andamento</div>
              </div>
              <div className="dashboard-card">
                <div className="card-number">R$ {orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}</div>
                <div className="card-label">Total Gasto</div>
              </div>
            </div>
            <div className="recent-orders">
              <h3>Pedidos Recentes</h3>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td><span className={`order-status ${getStatusClass(order.status)}`}>{getStatusText(order.status)}</span></td>
                      <td>R$ {order.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      
      case 'pedidos':
        return (
          <>
            <div className="content-header">
              <h1 className="content-title">Meus Pedidos</h1>
              <p className="content-subtitle">Acompanhe todos os seus pedidos</p>
            </div>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <strong>Pedido #{order.id}</strong>
                      <p>{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`order-status ${getStatusClass(order.status)}`}>{getStatusText(order.status)}</span>
                  </div>
                  <div className="order-body">
                    <p>{order.items?.length || 0} item(s)</p>
                    <strong>R$ {order.total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>
                  </div>
                  {order.status === 'pending' && (
                    <button className="btn-delete" onClick={() => handleCancelOrder(order.id)}>Cancelar Pedido</button>
                  )}
                </div>
              ))}
            </div>
          </>
        );
      
      case 'perfil':
        return (
          <>
            <div className="content-header">
              <h1 className="content-title">Meu Perfil</h1>
              <p className="content-subtitle">Gerencie suas informações pessoais</p>
            </div>
            {!isEditing ? (
              <div className="profile-info">
                <div className="info-row">
                  <label>Nome Completo</label>
                  <p>{userData.name}</p>
                </div>
                <div className="info-row">
                  <label>Email</label>
                  <p>{userData.email}</p>
                </div>
                <button className="btn-primary" onClick={handleEditProfile}>Editar Perfil</button>
                <button className="btn-secondary" onClick={() => window.location.href = '/reset-senha'} style={{marginTop: '10px'}}>🔒 Trocar Senha</button>
                <button className="btn-delete-account" onClick={() => setShowDeleteModal(true)}>⚠️ Deletar Conta</button>
              </div>
            ) : (
              <div className="profile-form">
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} />
                </div>
                <div className="form-actions">
                  <button className="btn-primary" onClick={handleSaveProfile}>Salvar</button>
                  <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
              </div>
            )}
          </>
        );
      
      case 'enderecos':
        return (
          <>
            <div className="content-header">
              <h1 className="content-title">Meus Endereços</h1>
              <p className="content-subtitle">Gerencie seus endereços de entrega</p>
            </div>
            <div className="addresses-list">
              {addresses.map(addr => (
                <div key={addr.id} className="address-card">
                  <div className="address-label">{addr.label}</div>
                  <p>{addr.street}</p>
                  <p>{addr.city} - {addr.state}</p>
                  <p>CEP: {addr.cep}</p>
                  <button className="btn-delete" onClick={() => handleDeleteAddress(addr.id)}>Remover</button>
                </div>
              ))}
              <div className="address-card add-new" onClick={() => setShowAddressForm(true)}>
                <span>+ Adicionar Novo Endereço</span>
              </div>
              {showAddressForm && (
                <div className="address-form">
                  <h3>Novo Endereço</h3>
                  <form onSubmit={handleSaveAddress}>
                    <input type="text" placeholder="Label (Casa, Trabalho...)" value={addressForm.label} onChange={(e) => setAddressForm({...addressForm, label: e.target.value})} required />
                    <input type="text" placeholder="Rua e Número" value={addressForm.street} onChange={(e) => setAddressForm({...addressForm, street: e.target.value})} required />
                    <input type="text" placeholder="Cidade" value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} required />
                    <input type="text" placeholder="Estado (SP, RJ...)" maxLength="2" value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value.toUpperCase()})} required />
                    <input type="text" placeholder="CEP" value={addressForm.cep} onChange={(e) => setAddressForm({...addressForm, cep: e.target.value})} required />
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">Salvar</button>
                      <button type="button" className="btn-secondary" onClick={() => setShowAddressForm(false)}>Cancelar</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="user-area">
      <div className="container">
        <div className="user-area-layout">
          <aside className="user-sidebar">
            <div className="user-profile-card">
              <div className="avatar-container">
                <div className="user-avatar" style={profilePhoto ? {backgroundImage: `url(${profilePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center'} : {}}>
                  {!profilePhoto && userData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="avatar-edit-btn" onClick={() => setShowPhotoMenu(!showPhotoMenu)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                {showPhotoMenu && (
                  <div className="photo-menu">
                    <label className="photo-menu-item">
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{display: 'none'}} />
                      📷 Alterar Foto
                    </label>
                    {profilePhoto && (
                      <button className="photo-menu-item" onClick={removePhoto}>
                        🗑️ Remover Foto
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="user-name">{userData.name}</div>
              <div className="user-email">{userData.email}</div>
            </div>
            <nav className="user-menu">
              <button onClick={() => setActiveSection('dashboard')} className={`menu-item ${activeSection === 'dashboard' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Dashboard
              </button>
              <button onClick={() => setActiveSection('pedidos')} className={`menu-item ${activeSection === 'pedidos' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Meus Pedidos
              </button>
              <button onClick={() => setActiveSection('perfil')} className={`menu-item ${activeSection === 'perfil' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Meu Perfil
              </button>
              <button onClick={() => setActiveSection('enderecos')} className={`menu-item ${activeSection === 'enderecos' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Endereços
              </button>
              <button onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }} className="menu-item logout-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Sair
              </button>
            </nav>
          </aside>
          <main className="user-content">
            {renderContent()}
          </main>
        </div>
      </div>
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Deletar Conta</h2>
            <p>Esta ação é <strong>irreversível</strong> e irá deletar:</p>
            <ul style={{textAlign: 'left', margin: '20px 0'}}>
              <li>Sua conta e dados pessoais</li>
              <li>Todos os seus pedidos</li>
              <li>Todos os seus endereços</li>
            </ul>
            <p>Digite sua <strong>senha</strong> para confirmar:</p>
            <input 
              type="password" 
              value={deletePassword} 
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Digite sua senha"
              style={{width: '100%', padding: '10px', marginBottom: '20px'}}
            />
            <div className="form-actions">
              <button className="btn-delete" onClick={handleDeleteAccount}>Confirmar Exclusão</button>
              <button className="btn-secondary" onClick={() => { setShowDeleteModal(false); setDeletePassword(''); }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Conta;