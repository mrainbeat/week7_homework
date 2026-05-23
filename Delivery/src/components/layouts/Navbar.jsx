import cart from '../../assets/cart.svg';
import { Link, useLocation } from 'react-router-dom';

//네브바 양쪽에 들어갈 내용을 props로 관리하기
const Navbar = ({ left, right }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F0485F] w-full h-[83px] flex items-center justify-between px-[40px] text-white">
      <div>{left}</div>
      <div className="flex gap-[38px] items-center">{right}</div>
    </nav>
  );
};

export default Navbar;
