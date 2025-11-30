import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Conta from './Pages/Area_usuario/Conta';
import Suporte from './Pages/Suporte';
import Carrinho from './Pages/Carrinho';
import ProdutoDetalhes from './Pages/ProdutoDetalhes';
import Ofertas from './Pages/Categorias/Ofertas';
import Smartphones from './Pages/Categorias/Smartphones';
import Computadores from './Pages/Categorias/Computadores';
import Games from './Pages/Categorias/Games';
import AudioVideo from './Pages/Categorias/AudioVideo';
import Acessorios from './Pages/Categorias/Acessorios';
import Busca from './Pages/Busca';
import AdminLogin from './Pages/Admin/AdminLogin';
import Admin from './Pages/Admin/Admin';
import ResetSenha from './Pages/ResetSenha';
import './App.css';

function StoreApp() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/reset-senha" element={<ResetSenha />} />
            <Route path="/conta" element={<Conta />} />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/produto/:id" element={<ProdutoDetalhes />} />
            <Route path="/busca" element={<Busca />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/smartphones" element={<Smartphones />} />
            <Route path="/computadores" element={<Computadores />} />
            <Route path="/games" element={<Games />} />
            <Route path="/audio-video" element={<AudioVideo />} />
            <Route path="/acessorios" element={<Acessorios />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

function AdminApp() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  
  return isAdminRoute ? <AdminApp /> : <StoreApp />;
}