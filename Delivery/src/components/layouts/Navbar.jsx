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
    <nav className="fixed top-0 left-0 right-0 w-full text-white">
      <div className="h-[83px] flex items-center justify-between px-[40px] bg-[#F0485F]">
        <div>{left}</div>
        <div className="dt:flex gap-[38px] items-center hidden ">{right}</div>
        {isPayCardPage ? (
          //결제 페이지일 때
          <Link to="/Order" className="dt:hidden cursor-pointer">
            <img src={cart} alt="장바구니" className="w-[32px] h-[32px]" />
          </Link>
        ) : isOrderPage ? (
          /* 2) 장바구니 페이지일 때: 햄버거 대신 '카드 아이콘' 띄우기 */
          <Link to="/PayCard" className="dt:hidden cursor-pointer">
            <img src={card} alt="결제하기" className="w-[32px] h-[32px]" />
          </Link>
        ) : (
          /* 3) 그 외 페이지(메뉴)일 때: 원래대로 '햄버거 버튼' 띄우기 */
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dt:hidden text-2xl cursor-pointer"
          >
            {isOpen ? <img src={close} /> : <img src={hamburger} />}
          </button>
        )}
      </div>
      {!isOrderPage && !isPayCardPage && isOpen && (
        <div
          className="dt:hidden w-full flex flex-col bg-[#FDF7C3] dt:pt-[83px] pt-[19px] h-[calc(100vh-83px)] ml-[139px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="flex flex-col items-center gap-4 text-[#F0485F]"
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
