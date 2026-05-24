import React, { useEffect, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import cart from '../assets/cart.svg';
import FoodBoard from '../components/Main/FoodBoard';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Menu = () => {
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
        left={<span className="text-[36px] font-bold">어쩌구저쩌구</span>}
        right={
          <div className="flex gap-[38px] items-center">
            <Link to="/Order" className="cursor-pointer">
              <img src={cart} alt="장바구니" />
            </Link>

            {isLoggedIn ? (
              <Link
                to="/Login"
                className="hover:text-black"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            ) : (
              <Link to="/Login" className="hover:text-black">
                로그인
              </Link>
            )}
          </div>
        }
      />
      <FoodBoard />
    </div>
  );
};

export default Menu;
