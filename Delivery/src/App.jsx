import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/ Signup';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Layout from './components/layouts/Layout';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="npm/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/Menu" replace />} />
          <Route path="Menu" element={<Menu />}></Route>
          <Route path="Order" element={<Order />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
