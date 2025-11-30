import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Carrinho.css';

function Carrinho() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="carrinho-vazio">
        <div className="container">
          <h2>Faça login para acessar seu carrinho</h2>
          <p>Você precisa estar logado para visualizar e gerenciar seus produtos</p>
          <div style={{display: 'flex', gap: '15px', justifyContent: 'center'}}>
            <Link to="/login" className="btn-primary">Fazer Login</Link>
            <Link to="/cadastro" className="btn-secondary-link">Criar Conta</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="carrinho-vazio">
        <div className="container">
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione produtos para continuar comprando</p>
          <Link to="/" className="btn-primary">Ir para Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrinho-page">
      <div className="container">
        <h1>Meu Carrinho</h1>
        <div className="carrinho-layout">
          <div className="carrinho-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">R$ {item.price.toLocaleString()}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">
                  <p>R$ {(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <button className="item-remove" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))}
            <button className="btn-clear" onClick={clearCart}>Limpar Carrinho</button>
          </div>
          <div className="carrinho-summary">
            <h3>Resumo do Pedido</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>R$ {cartTotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Frete</span>
              <span>{cartTotal >= 199 ? 'Grátis' : 'R$ 15'}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>R$ {(cartTotal >= 199 ? cartTotal : cartTotal + 15).toLocaleString()}</span>
            </div>
            <button className="btn-checkout">Finalizar Compra</button>
            <Link to="/" className="btn-continue">Continuar Comprando</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;
