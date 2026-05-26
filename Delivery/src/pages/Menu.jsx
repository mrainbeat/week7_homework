import React, { useEffect, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import cart from '../assets/cart.svg';
import FoodBoard from '../components/main/FoodBoard';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Menu = ({ addToCart }) => {
  const navigate = useNavigate();

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

  return (
    <div>
      <Navbar
        left={<span className="text-[36px] font-bold">주문하기 </span>}
        right={
          <div className="flex flex-col dt:flex-row dt:gap-[38px] dt:items-center font-bold">
            <Link to="/Order" className="hidden dt:block cursor-pointer">
              <img src={cart} alt="장바구니" />
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
      <FoodBoard addToCart={addToCart} />
    </div>
  );
};

export default Menu;
