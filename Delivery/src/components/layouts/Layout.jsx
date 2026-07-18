//자식 라우트가 들어갈 자리를 비워두는 중첩 라우팅
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Background from '../../assets/Background/background.png';

const Layout = ({
  cart = [],
  addToCart,
  clearCart,
  updateCartQuantity,
  removeCartItem,
}) => {
  return (
    <div>
      <Navbar />
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="bg-cover bg-center bg-no-repeat min-h-screen w-full "
      >
        <Outlet
          context={{
            cart,
            addToCart,
            clearCart,
            updateCartQuantity,
            removeCartItem,
          }}
        />
      </div>
    </div>
  );
};

export default Layout;
