import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import "./Header.css"

function Header() {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <header className="header">
      <div className="header-main">
        <div className="container">
          <Link to="/" className="logo">
            <h1>
              Busca<span>Shop</span>
            </h1>
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Busque por produtos, marcas e muito mais..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <div className="header-actions">
            {user ? (
              <Link to="/conta" className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">Entrar</Link>
                <Link to="/cadastro" className="btn-register">Cadastrar</Link>
              </div>
            )}
            {user && (
              <Link to="/carrinho" className="icon-btn cart-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 2L7 6H3v14h18V6h-4l-2-4H9z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            )}
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="container">
          <Link to="/">Home</Link>
          <Link to="/ofertas">Ofertas do Dia</Link>
          <Link to="/smartphones">Smartphones / Tablets</Link>
          <Link to="/computadores">Notebooks / Computadores</Link>
          <Link to="/games">Games</Link>
          <Link to="/audio-video">Áudio & Vídeo</Link>
          <Link to="/acessorios">Acessórios</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
