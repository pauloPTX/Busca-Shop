import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './ProdutoDetalhes.css';

function ProdutoDetalhes() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await api.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!product) {
    return (
      <div className="produto-nao-encontrado">
        <div className="container">
          <h2>Produto não encontrado</h2>
          <Link to="/" className="btn-primary">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="produto-detalhes">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> / <Link to={`/${product.category.toLowerCase()}`}>{product.category}</Link> / {product.name}
        </div>
        <div className="produto-layout">
          <div className="produto-imagem">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="produto-info">
            <h1>{product.name}</h1>
            {product.badge === 'Oferta' && product.discount && (
              <div className="produto-oferta-badge">
                🔥 {product.discount}% OFF - Oferta Especial!
              </div>
            )}
            <div className="produto-rating">
              <span className="stars">{"⭐".repeat(Math.floor(product.rating))}</span>
              <span className="rating-text">{product.rating} (234 avaliações)</span>
            </div>
            <p className="produto-descricao">{product.description}</p>
            <div className="produto-preco">
              <span className="preco-atual">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="preco-parcelado">ou 12x de R$ {(product.price / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="produto-estoque">
              <span className="estoque-label">Estoque:</span>
              <span className="estoque-valor">{product.stock || 0} unidades disponíveis</span>
            </div>
            <div className="produto-acoes">
              <div className="quantidade-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}>+</button>
              </div>
              <button 
                className={`btn-add-cart ${added ? 'added' : ''}`} 
                onClick={handleAddToCart}
                disabled={!product.stock || product.stock === 0}
              >
                {!product.stock || product.stock === 0 ? 'Sem Estoque' : added ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
              </button>
            </div>
            <div className="produto-beneficios">
              <div className="beneficio">
                <span>🚚</span>
                <div>
                  <strong>Frete Grátis</strong>
                  <p>Para compras acima de R$ 199</p>
                </div>
              </div>
              <div className="beneficio">
                <span>🔄</span>
                <div>
                  <strong>Troca Grátis</strong>
                  <p>7 dias para trocar ou devolver</p>
                </div>
              </div>
              <div className="beneficio">
                <span>🔒</span>
                <div>
                  <strong>Compra Segura</strong>
                  <p>Seus dados protegidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdutoDetalhes;
