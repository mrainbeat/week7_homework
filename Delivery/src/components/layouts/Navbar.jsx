import cart from '../../assets/cart.svg';
import close from '../../assets/close.svg';
import hamburger from '../../assets/hamburger.svg';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ left, right, cartLength = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isPayCardPage = location.pathname.includes('/PayCard');
  const isOrderPage = location.pathname.includes('/Order');

  // Order 페이지면 실시간 props, 아니면 로컬스토리지 값
  const displayCount = isOrderPage
    ? cartLength
    : localStorage.getItem('cartCount') || 0;

  return (
    <nav className="fixed top-0 left-0 right-0 w-full text-white z-[999]">
      <div className="h-[83px] flex items-center justify-between px-[40px] bg-red-primary">
        <div>{left}</div>
        <div className="dt:flex gap-[38px] items-center hidden relative">
          {right}
        </div>

        {isPayCardPage ? (
          <Link to="/Order" className="dt:hidden cursor-pointer relative">
            <img src={cart} alt="장바구니" className="w-[32px] h-[32px]" />
            {displayCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-primary text-[12px] font-bold w-[20px] h-[20px] flex items-center justify-center rounded-full border-2 border-red-primary">
                {displayCount > 9 ? '9+' : displayCount}
              </span>
            )}
          </Link>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dt:hidden text-2xl cursor-pointer"
          >
            {isOpen ? (
              <img src={close} alt="닫기" />
            ) : (
              <img src={hamburger} alt="메뉴" />
            )}
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
