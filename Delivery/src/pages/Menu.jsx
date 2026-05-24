import React, { useEffect, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import cart from '../assets/cart.svg';
import FoodBoard from '../components/main/FoodBoard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FoodCategoryButton from '../components/main/FoodCategoryButton';

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

  const [category, setCategory] = useState('전체');
  const categories = ['전체', '중식', '한식', '기타'];

  // 각 아이템의 타입과 현재 카테고리 타입을 비교후 열치하는 타입만 필터링하기
  const filteredFoods =
    category === '전체'
      ? StoreMockData
      : StoreMockData.filter((food) => food.type === category);

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
      {categroies.map((item) => (
        <FoodCategoryButton category={categories} />
      ))}
      <FoodBoard />
    </div>
  );
};

export default Menu;
