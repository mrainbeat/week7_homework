import cart from '../../assets/cart.svg';
import card from '../../assets/card.svg';
import close from '../../assets/close.svg';
import hamburger from '../../assets/hamburger.svg';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ left, right }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isOrderPage = location.pathname.includes('/Order');
  const isPayCardPage = location.pathname.includes('/PayCard');

  return (
    /* 🌟 네비바 대장 태그 (999층 유지) */
    <nav className="fixed top-0 left-0 right-0 w-full text-white z-[999]">
      <div className="h-[83px] flex items-center justify-between px-[40px] bg-red-primary ">
        <div>{left}</div>
        <div className="dt:flex gap-[38px] items-center hidden relative">
          {right}
        </div>
        {isPayCardPage ? (
          //결제 페이지일 때
          <Link to="/Order" className="dt:hidden cursor-pointer">
            <img src={cart} alt="장바구니" className="w-[32px] h-[32px]" />
          </Link>
        ) : (
          /* 2) 그 외 페이지(메뉴)일 때: 원래대로 '햄버거 버튼' 띄우기 */
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dt:hidden text-2xl cursor-pointer"
          >
            {isOpen ? <img src={close} /> : <img src={hamburger} />}
          </button>
        )}
      </div>

      {!isPayCardPage && isOpen && (
        <div
          className="dt:hidden w-screen flex flex-col bg-gray-1 pt-[19px] h-[calc(100vh-83px)] fixed top-[83px] left-0 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="flex flex-col items-end gap-4 text-red-primary pr-[40px]"
            onClick={(e) => e.stopPropagation()}
          >
            {right}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
