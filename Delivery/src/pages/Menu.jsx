import Navbar from '../components/layouts/Navbar';
import cart from '../assets/cart.svg';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <Navbar
        left={<span className="text-2xl">장바구니</span>}
        right={
          <>
            <img src={cart} alt="장바구니" />
            <Link to="/Login" className="hover:text-black">
              {' '}
              로그아웃
            </Link>
          </>
        }
      />
    </div>
  );
};

export default Menu;
