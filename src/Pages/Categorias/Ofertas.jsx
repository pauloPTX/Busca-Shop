import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import './Categoria.css';

function Ofertas() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProductsByBadge('Oferta').then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="categoria-page">
      <div className="container">
        <div className="page-header">
          <h1>🔥 Ofertas do Dia</h1>
          <p>Aproveite descontos imperdíveis em produtos selecionados</p>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="discount-badge">{product.discount}% OFF</div>
              <Link to={`/produto/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/produto/${product.id}`}>
                  <h4>{product.name}</h4>
                </Link>
                <div className="rating">
                  <span className="stars">{"⭐".repeat(Math.floor(product.rating))}</span>
                </div>
                <div className="price-section">
                  <span className="old-price">R$ {product.oldPrice.toLocaleString()}</span>
                  <span className="price">R$ {product.price.toLocaleString()}</span>
                </div>
                <button className="btn-add" onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ofertas;
