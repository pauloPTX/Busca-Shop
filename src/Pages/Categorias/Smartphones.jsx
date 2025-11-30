import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import './Categoria.css';

function Smartphones() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProductsByCategory('Smartphones').then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="categoria-page">
      <div className="container">
        <div className="page-header">
          <h1>📱 Smartphones / Tablets</h1>
          <p>Os melhores smartphones e tablets do mercado</p>
        </div>
        {products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px 20px', color: '#666'}}>
            <p style={{fontSize: '18px'}}>Nenhum produto encontrado nessa categoria</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
            <div key={product.id} className="product-card">
              {product.badge === 'Oferta' && product.discount ? (
                <div className="discount-badge">{product.discount}% OFF</div>
              ) : product.badge ? (
                <div className="product-badge">{product.badge}</div>
              ) : null}
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <Link to={`/produto/${product.id}`}>
                  <h4>{product.name}</h4>
                </Link>
                <div className="rating">
                  <span className="stars">{"⭐".repeat(Math.floor(product.rating))}</span>
                  <span>({product.rating})</span>
                </div>
                <div className="price-section">
                  <span className="price">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <button className="btn-add" onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Smartphones;
