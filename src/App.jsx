import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />} path='/' />
      </Routes>
    </BrowserRouter>
  );
}
