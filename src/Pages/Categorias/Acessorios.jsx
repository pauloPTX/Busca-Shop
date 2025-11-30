import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import './Categoria.css';

function Acessorios() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(data => {
      const acessorios = data.filter(p => !['Smartphones', 'Notebooks', 'Games', 'Áudio', 'Câmeras'].includes(p.category));
      setProducts(acessorios);
    }).catch(console.error);
  }, []);

  return (
    <div className="categoria-page">
      <div className="container">
        <div className="page-header">
          <h1>⌨️ Acessórios</h1>
          <p>Periféricos e acessórios para seu setup</p>
        </div>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <Link to={`/produto/${product.id}`}><h4>{product.name}</h4></Link>
                <div className="rating">
                  <span className="stars">{"⭐".repeat(Math.floor(product.rating))}</span>
                  <span>({product.rating})</span>
                </div>
                <div className="price-section">
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

export default Acessorios;
