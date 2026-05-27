import React, { useEffect, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import cartIcon from '../assets/cart.svg';
import FoodBoard from '../components/main/FoodBoard';
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  const { cart, addToCart } = useOutletContext();

  // 로그인 상태를 리액트 state로 관리
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // 로그아웃 버튼 동작 함수
  const handleLogout = (e) => {
    e.preventDefault(); // 링크 이동 동작 차단

    localStorage.removeItem('isLoggedIn'); // 로컬스토리지 비우기
    setIsLoggedIn(false); // 리액트 상태를 false로 변경하여 화면 갱신
  };

  const quantityArray = cart.map((item) => Number(item.quantity || 0)); // quantity만 추출

  // 추출한 수량 배열을 다 더하기
  const totalQuantity = quantityArray.reduce((sum, qty) => sum + qty, 0);

  return (
    <div>
      <Navbar
        left={<span className="text-[36px] font-bold">주문하기 </span>}
        right={
          <div className="flex flex-col dt:flex-row dt:gap-[38px] dt:items-center font-bold">
            <Link
              to="/Order"
              className="hidden dt:block cursor-pointer relative"
            >
              <img src={cartIcon} alt="장바구니 " />
              <div className="absolute -top-2 -right-2 bg-[#FDF7C3] text-black text-[8px] font-bold px-[8px] h-[14px] rounded-[20px] flex items-center justify-center w-[11px] ">
                {totalQuantity}
              </div>
            </Link>
            <Link to="/Order" className="dt:hidden cursor-pointer text-[20px]">
              장바구니
            </Link>

            {isLoggedIn ? (
              <Link
                to="/Login"
                className="hover:text-black text-[20px]"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            ) : (
              <Link to="/Login" className="hover:text-black text-[20px] ">
                로그인
              </Link>
            )}
          </div>
        }
      />
      <FoodBoard addToCart={addToCart} cart={cart} />
    </div>
  );
};

export default Menu;
