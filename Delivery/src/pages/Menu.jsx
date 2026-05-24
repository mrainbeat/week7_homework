import React, { useEffect } from 'react';
import Navbar from '../components/layouts/Navbar';
import cart from '../assets/cart.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem('isLoggedIn');

  // 🛡️ 로그인 제한 가드
  useEffect(() => {
    if (loginStatus !== 'true') {
      // 비로그인시 로그인으로 이동
      navigate('/Login', { replace: true });
    }
  }, [loginStatus, navigate]);

  // 🚪 로그아웃 버튼 동작 함수
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
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

            <Link
              to="/Login"
              className="hover:text-black"
              onClick={handleLogout}
            >
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
