import Navbar from '../components/layouts/Navbar';
import cart from '../assets/cart.svg';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <Navbar
        left={<span className="text-[36px] font-bold">장바구니</span>}
        right={
          <div className="flex gap-[38px] items-center">
            <img src={cart} alt="장바구니" />
            <Link to="/Login" className="hover:text-black">
              {' '}
              로그아웃
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default Menu;
