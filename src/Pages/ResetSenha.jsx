import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function ResetSenha() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStep(2);
        alert('Código enviado para seu email!');
      } else {
        const data = await response.json();
        setError(data.error || 'Email não encontrado');
      }
    } catch (error) {
      setError('Erro ao enviar código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      if (response.ok) {
        setStep(3);
      } else {
        setError('Código inválido ou expirado');
      }
    } catch (error) {
      setError('Erro ao verificar código');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      });

      if (response.ok) {
        alert('Senha alterada com sucesso!');
        navigate('/login');
      } else {
        setError('Erro ao alterar senha');
      }
    } catch (error) {
      setError('Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">🔒</div>
            <h1>Redefinir Senha</h1>
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
              <div className="step-line"></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {step === 1 && (
            <form onSubmit={handleSendCode}>
              <p className="auth-subtitle">Digite seu email para receber o código de verificação</p>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-auth" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Código'}
              </button>
              <p className="auth-link">
                Lembrou a senha? <Link to="/login">Fazer login</Link>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <p className="auth-subtitle">Digite o código de 6 dígitos enviado para <strong>{email}</strong></p>
              <div className="form-group">
                <label>Código de Verificação</label>
                <input
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength="6"
                  style={{textAlign: 'center', fontSize: '24px', letterSpacing: '8px'}}
                  required
                />
              </div>
              <button type="submit" className="btn-auth" disabled={loading}>
                {loading ? 'Verificando...' : 'Verificar Código'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="btn-secondary">
                Voltar
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <p className="auth-subtitle">Digite sua nova senha</p>
              <div className="form-group">
                <label>Nova Senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nova Senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-auth" disabled={loading}>
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetSenha;
