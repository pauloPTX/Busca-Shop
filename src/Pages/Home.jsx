import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import "../Styles/Home.css"

function Home() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('todos');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [activeFilter]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      let data;
      switch(activeFilter) {
        case 'mais-vendidos':
          data = await api.getProductsByBadge('Mais Vendido');
          break;
        case 'novidades':
          data = await api.getProductsByBadge('Novidade');
          break;
        case 'ofertas':
          data = await api.getProductsByBadge('Oferta');
          break;
        default:
          data = await api.getProducts();
      }
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-header">
          <h3 className="section-title">Produtos em Destaque</h3>
          <div className="filter-tabs">
            <button className={`tab ${activeFilter === 'todos' ? 'active' : ''}`} onClick={() => setActiveFilter('todos')}>Todos</button>
            <button className={`tab ${activeFilter === 'mais-vendidos' ? 'active' : ''}`} onClick={() => setActiveFilter('mais-vendidos')}>Mais Vendidos</button>
            <button className={`tab ${activeFilter === 'novidades' ? 'active' : ''}`} onClick={() => setActiveFilter('novidades')}>Novidades</button>
            <button className={`tab ${activeFilter === 'ofertas' ? 'active' : ''}`} onClick={() => setActiveFilter('ofertas')}>Ofertas</button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Carregando produtos...</div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.badge === 'Oferta' && product.discount ? (
                <div className="product-badge">{product.discount}% OFF</div>
              ) : product.badge ? (
                <div className="product-badge">{product.badge}</div>
              ) : null}
              <Link to={`/produto/${product.id}`}>
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/produto/${product.id}`}>
                  <h4>{product.name}</h4>
                </Link>
                <div className="rating">
                  <span className="stars">{"⭐".repeat(Math.floor(product.rating))}</span>
                  <span className="rating-value">({product.reviews})</span>
                </div>
                <div className="product-footer">
                  <span className="price">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <button className="btn-add" onClick={() => addToCart(product)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M6 1L3 6v14h14V6l-3-5H6z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 6h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 10a3 3 0 1 1-6 0"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}

        <div className="view-more">
          <button className="btn-secondary">Ver Mais Produtos</button>
        </div>
      </div>
    </section>
  )
}

export default Home
