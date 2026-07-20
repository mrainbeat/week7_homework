import React, { useEffect, useState } from 'react';
import Navbar from '../components/layouts/Navbar';
import cartIcon from '../assets/cart.svg';
import cardIcon from '../assets/card.svg'; // 카드 아이콘 임포트 추가
import FoodBoard from '../components/main/FoodBoard';
import Background from '../assets/Background/background.png';
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const { cart, addToCart, clearCart, updateCartQuantity, removeCartItem } =
    useOutletContext();

  // 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  // 로컬스토리지에서 현재 보유 크레딧 불러오기 (기본값 5000C)
  const [myCredit, setMyCredit] = useState(() => {
    const savedCredit = localStorage.getItem('myCredit');
    return savedCredit ? Number(savedCredit) : 0;
  });

  const [totalQuantity, setTotalQuantity] = useState(0);

  //서버에 원래 있던 개수를 전부 다 더함
  useEffect(() => {
    if (cart) {
      let total = 0;

      cart.forEach((element) => {
        //{items : [] 구조인 경우 (즉, 서버에서 받아온 카트묶음일 경우)}
        if (element.items && Array.isArray(element.items)) {
          element.items.forEach((item) => {
            total += Number(item.quantity || 0);
          });
        }
      });

      setTotalQuantity(total);
    }
  }, [cart]); //cart배열이 바뀔때마다 실행되도록 변경

  // 로그아웃 버튼 동작 함수
  const handleLogout = (e) => {
    e.preventDefault();
    clearCart();
    localStorage.removeItem('myCart');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    localStorage.removeItem('myCredit'); // 로그아웃 시 크레딧 초기화
    setIsLoggedIn(false);
    alert('로그아웃 되었습니다.');
  };

  return (
    <div>
      <Navbar
        left={<span className="text-[36px] font-bold">주문하기</span>}
        right={
          <div className="flex flex-col dt:flex-row dt:gap-[38px] dt:items-center font-bold ">
            {/* 1. 크레딧 잔액 표시 및 충전 페이지 이동 링크 */}
            {isLoggedIn && (
              <Link
                to="/CreditCharge"
                className="hidden dt:flex flex-col items-center justify-center cursor-pointer gap-[4px] hover:opacity-80 transition-opacity"
              >
                <img
                  src={cardIcon}
                  alt="크레딧 충전"
                  className="w-[24px] h-[24px]"
                />
                <span className="text-[12px] font-bold">
                  {myCredit.toLocaleString()}C
                </span>
              </Link>
            )}

            {/* 2. 기존 장바구니 링크 */}
            <Link
              to="/Order"
              className="hidden dt:block cursor-pointer relative hover:opacity-80 transition-opacity"
            >
              <img
                src={cartIcon}
                alt="장바구니"
                className="w-[24px] h-[24px]"
              />
              <div className="absolute -top-2 -right-2 bg-[#FDF7C3] text-black text-[8px] font-bold px-[8px] h-[14px] rounded-[20px] flex items-center justify-center min-w-[11px]">
                {isLoggedIn ? totalQuantity : 0}
              </div>
            </Link>

            {/* 3. 로그인/로그아웃 링크 */}
            {isLoggedIn ? (
              <Link
                to="/Login"
                className="hidden dt:block hover:text-black text-[20px] transition-colors"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            ) : (
              <Link
                to="/Login"
                className="hidden dt:block hover:text-black text-[20px] transition-colors"
              >
                로그인
              </Link>
            )}
            <div className="text-black flex flex-col pr-5 items-end">
              {/* 모바일 뷰용 장바구니 링크 */}
              <Link
                to="/Order"
                className="dt:hidden cursor-pointer text-[20px]"
              >
                장바구니
              </Link>
              {/* 모바일 뷰용 크레딧 링크 */}
              <Link
                to="/CreditCharge"
                className="dt:hidden cursor-pointer text-[20px]"
              >
                크레딧 충전
              </Link>
              {/* 모바일 뷰용 로그인 로그아웃 링크 */}
              {isLoggedIn ? (
                <Link
                  to="/Login"
                  className="dt:hidden hover:text-black text-[20px] transition-colors"
                  onClick={handleLogout}
                >
                  로그아웃
                </Link>
              ) : (
                <Link
                  to="/Login"
                  className="dt:hidden hover:text-black text-[20px] transition-colors"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        }
      />
      <FoodBoard
        addToCart={addToCart}
        cart={cart}
        updateCartQuantity={updateCartQuantity}
        removeCartItem={removeCartItem}
      />
    </div>
  );
};

export default Menu;
