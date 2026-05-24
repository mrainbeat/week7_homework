import React, { useEffect } from 'react';
import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem('isLoggedIn');

  // 🛡️ 로그인 제한 가드 (함수 안쪽으로 안전하게 이동)
  useEffect(() => {
    if (loginStatus !== 'true') {
      navigate('/Login', { replace: true });
    }
  }, [loginStatus, navigate]);

  return (
    <div>
      <Navbar
        left={
          <div className="flex gap-[48px] items-center">
            <Link to="/Menu" className="cursor-pointer">
              <img src={Leftarrow} alt="왼쪽화실표" />
            </Link>
            <span className="text-[36px] font-bold">장바구니</span>
          </div>
        }
      />
    </div>
  );
};

export default Order;
