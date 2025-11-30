import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Suporte.css';

function Suporte() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('faq');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [location]);

  const renderContent = () => {
    switch(activeSection) {
      case 'faq':
        return (
          <>
            <h2>Perguntas Frequentes</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>Como faço para rastrear meu pedido?</h3>
                <p>Você pode rastrear seu pedido acessando Minha Conta e depois Meus Pedidos, clicando no número do pedido desejado.</p>
              </div>
              <div className="faq-item">
                <h3>Qual o prazo de entrega?</h3>
                <p>O prazo varia de acordo com sua região. Geralmente entre 3 a 10 dias úteis após a confirmação do pagamento.</p>
              </div>
              <div className="faq-item">
                <h3>Como posso trocar ou devolver um produto?</h3>
                <p>Você tem até 7 dias após o recebimento para solicitar troca ou devolução. Entre em contato com nosso suporte.</p>
              </div>
              <div className="faq-item">
                <h3>Quais formas de pagamento são aceitas?</h3>
                <p>Aceitamos cartão de crédito, débito, PIX e boleto bancário.</p>
              </div>
            </div>
          </>
        );
      
      case 'rastreio':
        return (
          <>
            <h2>Rastrear Pedido</h2>
            <div className="tracking-form">
              <p>Digite o código de rastreamento para acompanhar seu pedido:</p>
              <div className="form-group">
                <input type="text" placeholder="Ex: BR123456789BR" />
                <button className="btn-primary">Rastrear</button>
              </div>
              <div className="tracking-info">
                <p>💡 Você também pode rastrear seu pedido pela área "Meus Pedidos" em sua conta.</p>
              </div>
            </div>
          </>
        );
      
      case 'entrega':
        return (
          <>
            <h2>Informações de Entrega</h2>
            <div className="info-section">
              <div className="info-card">
                <h3>📦 Prazo de Entrega</h3>
                <p>Região Sudeste: 3-5 dias úteis</p>
                <p>Região Sul: 5-7 dias úteis</p>
                <p>Demais regiões: 7-10 dias úteis</p>
              </div>
              <div className="info-card">
                <h3>🚚 Frete Grátis</h3>
                <p>Compras acima de R$ 199,00 têm frete grátis para todo o Brasil!</p>
              </div>
              <div className="info-card">
                <h3>📍 Retirada na Loja</h3>
                <p>Disponível em São Paulo. Retire seu pedido em até 2 horas após a confirmação.</p>
              </div>
            </div>
          </>
        );
      
      case 'devolucao':
        return (
          <>
            <h2>Trocas e Devoluções</h2>
            <div className="info-section">
              <div className="info-card">
                <h3>⏰ Prazo</h3>
                <p>Você tem 7 dias corridos a partir do recebimento do produto para solicitar troca ou devolução.</p>
              </div>
              <div className="info-card">
                <h3>📋 Condições</h3>
                <p>• Produto sem uso e na embalagem original</p>
                <p>• Todos os acessórios e manuais inclusos</p>
                <p>• Nota fiscal do produto</p>
              </div>
              <div className="info-card">
                <h3>💰 Reembolso</h3>
                <p>O reembolso é processado em até 7 dias úteis após recebermos o produto de volta.</p>
              </div>
            </div>
          </>
        );
      
      case 'contato':
        return (
          <>
            <h2>Entre em Contato</h2>
            <div className="contact-section">
              <div className="contact-methods">
                <div className="contact-card">
                  <h3>📞 Telefone</h3>
                  <p>(11) 4002-8922</p>
                  <p>Seg a Sex: 8h às 20h</p>
                  <p>Sáb: 9h às 18h</p>
                </div>
                <div className="contact-card">
                  <h3>📧 Email</h3>
                  <p>suporte@buscashop.com.br</p>
                  <p>Respondemos em até 24h</p>
                </div>
                <div className="contact-card">
                  <h3>💬 Chat Online</h3>
                  <p>Disponível no site</p>
                  <p>Seg a Sex: 8h às 20h</p>
                </div>
              </div>
              <div className="contact-form">
                <h3>Envie sua Mensagem</h3>
                <form>
                  <div className="form-group">
                    <label>Nome</label>
                    <input type="text" placeholder="Seu nome completo" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Assunto</label>
                    <input type="text" placeholder="Assunto da mensagem" />
                  </div>
                  <div className="form-group">
                    <label>Mensagem</label>
                    <textarea rows="5" placeholder="Descreva sua dúvida ou problema"></textarea>
                  </div>
                  <button type="submit" className="btn-primary">Enviar Mensagem</button>
                </form>
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="suporte-page">
      <div className="container">
        <div className="suporte-layout">
          <aside className="suporte-sidebar">
            <h3>Central de Ajuda</h3>
            <nav className="suporte-menu">
              <button onClick={() => setActiveSection('faq')} className={`menu-item ${activeSection === 'faq' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor"/>
                </svg>
                Perguntas Frequentes
              </button>
              <button onClick={() => setActiveSection('rastreio')} className={`menu-item ${activeSection === 'rastreio' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Rastrear Pedido
              </button>
              <button onClick={() => setActiveSection('entrega')} className={`menu-item ${activeSection === 'entrega' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M16 3h5v13h-5M16 8h5M1 8h11v13H1z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Informações de Entrega
              </button>
              <button onClick={() => setActiveSection('devolucao')} className={`menu-item ${activeSection === 'devolucao' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Trocas e Devoluções
              </button>
              <button onClick={() => setActiveSection('contato')} className={`menu-item ${activeSection === 'contato' ? 'active' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Entre em Contato
              </button>
            </nav>
          </aside>
          <main className="suporte-content">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Suporte;
