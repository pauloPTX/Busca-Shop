import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import './Categorias/Categoria.css';

function Busca() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchProducts();
  }, [query]);

  const searchProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await api.getProducts();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="categoria-page">
      <div className="container">
        <div className="page-header">
          <h1>🔍 Resultados para "{query}"</h1>
          <p>{products.length} produto(s) encontrado(s)</p>
        </div>
        {loading ? (
          <div style={{textAlign: 'center', padding: '40px'}}>Carregando...</div>
        ) : products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '40px'}}>
            <p>Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <Link to={`/produto/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <Link to={`/produto/${product.id}`}>
                    <h4>{product.name}</h4>
                  </Link>
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
        )}
      </div>
    </div>
  );
}

export default Busca;
