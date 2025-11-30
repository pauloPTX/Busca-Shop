import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Conta.css';

function Conta() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: ''
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        cpf: user.cpf || ''
      });
    }
  }, [user]);
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Casa', street: 'Rua das Flores, 123', city: 'São Paulo - SP', cep: '01234-567' },
    { id: 2, label: 'Trabalho', street: 'Av. Paulista, 1000', city: 'São Paulo - SP', cep: '01310-100' }
  ]);
  const [orders] = useState([
    { id: '#12345', date: '15/12/2024', status: 'delivered', total: 899, items: 'iPhone 15 Pro Max' },
    { id: '#12344', date: '10/12/2024', status: 'shipped', total: 1299, items: 'MacBook Air M2' },
    { id: '#12343', date: '05/12/2024', status: 'processing', total: 649, items: 'Fone Sony WH-1000XM5' }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userData);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);

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

  const handleSaveProfile = () => {
    setUserData(editForm);
    setIsEditing(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
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
      processing: 'Processando'
    };
    return textMap[status];
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
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td><span className={`order-status ${getStatusClass(order.status)}`}>{getStatusText(order.status)}</span></td>
                      <td>R$ {order.total.toLocaleString()},00</td>
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
                      <strong>Pedido {order.id}</strong>
                      <p>{order.date}</p>
                    </div>
                    <span className={`order-status ${getStatusClass(order.status)}`}>{getStatusText(order.status)}</span>
                  </div>
                  <div className="order-body">
                    <p>{order.items}</p>
                    <strong>R$ {order.total.toLocaleString()},00</strong>
                  </div>
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
                <div className="info-row">
                  <label>Telefone</label>
                  <p>{userData.phone}</p>
                </div>
                <div className="info-row">
                  <label>CPF</label>
                  <p>{userData.cpf}</p>
                </div>
                <button className="btn-primary" onClick={handleEditProfile}>Editar Perfil</button>
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
                <div className="form-group">
                  <label>Telefone</label>
                  <input type="text" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>CPF</label>
                  <input type="text" value={editForm.cpf} onChange={(e) => setEditForm({...editForm, cpf: e.target.value})} />
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
                  <p>{addr.city}</p>
                  <p>CEP: {addr.cep}</p>
                  <button className="btn-delete" onClick={() => handleDeleteAddress(addr.id)}>Remover</button>
                </div>
              ))}
              <div className="address-card add-new">
                <span>+ Adicionar Novo Endereço</span>
              </div>
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
    </div>
  );
}

export default Conta;