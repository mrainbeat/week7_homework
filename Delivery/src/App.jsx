import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/ Signup';
import Menu from './pages/Menu';
import Order from './pages/Order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Menu" element={<Menu />}></Route>
        <Route path="/Order" element={<Order />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
