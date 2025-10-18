import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { logout } from './features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <>
      <Navbar user={user} onLogout={() => dispatch(logout())} variant="glass" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
      </Routes>
    </>
  );
}
