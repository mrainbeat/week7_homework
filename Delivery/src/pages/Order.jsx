import React, { useEffect, useState } from 'react';
import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import CartList from '../components/Cart/CartList';
import Payment from '../components/Cart/Payment';

const Order = ({ cart = [], addToCart, removeCartItem }) => {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem('isLoggedIn');

  //로그인 여부 체크하기
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus === 'true');
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('IsLoggedIn');
    setIsLoggedIn(false);
  };

  // 로컬스토리지에서 유저의 보유 크레딧 읽기 (기본값 5000C)
  const [myCredit, setMyCredit] = useState(() => {
    const savedCredit = localStorage.getItem('myCredit');
    return savedCredit ? Number(savedCredit) : 5000;
  });

  // 로그인 제한 가드
  useEffect(() => {
    if (loginStatus !== 'true') {
      navigate('/Login', { replace: true });
    }
  }, [loginStatus, navigate]);

  // 총 결제 금액 실시간 계산
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 차감 후 잔액 계산 및 부족 여부 판별
  const afterCredit = myCredit - totalPrice;
  const isShortage = afterCredit < 0;

  // 장바구니 데이터를 가게이름 기준으로 정렬
  const groupedCart = cart.reduce((groups, item) => {
    if (!groups[item.storeName]) {
      groups[item.storeName] = [];
    }
    groups[item.storeName].push(item);
    return groups;
  }, {});

  // 최종 결제하기 버튼 클릭 함수
  const handlePaymentSubmit = () => {
    if (cart.length === 0 || isShortage) return;

    // 1. 유저 보유 크레딧 차감 후 업데이트
    localStorage.setItem('myCredit', String(afterCredit));

    // 2. 브라우저 장바구니 데이터 삭제
    localStorage.removeItem('myCart');

    // 3. App.jsx의 리액트 상태를 비우기 위해, 창을 새로고침하며 완료 페이지로 강제 리다이렉트
    window.location.href = '/CompleteOrder';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar
        totalPrice={totalPrice}
        cartLength={cart.length}
        left={
          <div className="flex gap-[48px] items-center">
            <Link to="/Menu" className="cursor-pointer">
              <img src={Leftarrow} alt="왼쪽화살표" />
            </Link>
            <span className="text-[36px] font-bold">장바구니</span>
          </div>
        }
        right={
          <div className="text-black flex flex-col pr-5 items-end">
            {/* 모바일 뷰용 장바구니 링크 */}
            <Link to="/Order" className="dt:hidden cursor-pointer text-[20px]">
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
        }
      />

      {/* 왼쪽 섹션: 장바구니 영역 */}
      {cart.length === 0 ? (
        <div className="w-full h-[100vh] flex flex-col items-center justify-center">
          <p className="text-[24px] font-semibold text-[#333333] mb-[32px]">
            장바구니가 비어있습니다.
          </p>
          <Link
            to="/Menu"
            className="py-[14px] px-[40px] text-gray-0 bg-red-primary text-[18px] font-bold rounded-[12px] no-underline shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:bg-red-secondary"
          >
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <div className="flex-1 flex flex-row items-center justify-center gap-[69px] w-[1200px] h-[604px] mx-auto box-border max-xl:w-full max-xl:h-auto max-xl:flex-col max-xl:p-[20px] max-xl:my-[40px]">
          <div className="w-[563px] h-[604px] flex flex-col box-border max-xl:w-full max-xl:max-w-[568px] max-xl:h-auto">
            <div className="w-full h-full bg-transparent dt:p-0 p-13 flex flex-col box-border overflow-y-auto">
              <div className="flex flex-col gap-[34px] dt:gap-[51px]">
                {Object.keys(groupedCart).map((storeName) => (
                  <div
                    key={storeName}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#F1F3F5]"
                  >
                    <div className="bg-red-assistive text-[20px] py-[12px] px-[24px]">
                      <h4 className="font-bold">{storeName}</h4>
                    </div>
                    <div>
                      {groupedCart[storeName].map((item) => (
                        <CartList
                          key={item.id || item.name}
                          item={item}
                          addToCart={addToCart}
                          removeCartItem={removeCartItem}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 섹션: 결제하기 카드 상자 */}
          <div className="hidden dt:block w-[568px] h-[604px] bg-white rounded-[32px] p-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#F8F9FA] flex flex-col box-border max-xl:w-full max-xl:max-w-[568px] max-xl:h-auto">
            <h2 className="text-[36px] font-black text-center text-[#111111] mb-[54px]">
              결제하기
            </h2>

            <div className="flex justify-between items-center mb-[32px]">
              <span className="text-[20px] font-bold text-[#111111]">
                총 결제금액
              </span>
              <span className="text-[24px] font-bold text-[#111111]">
                {totalPrice === 0 ? '00,000' : totalPrice.toLocaleString()}원
              </span>
            </div>

            {/* 회색 크레딧 현황 요약 박스 */}
            <div className="w-full bg-[#F8F9FA] rounded-[12px] p-[24px] flex flex-col gap-[16px] box-border">
              <div className="flex justify-between text-[18px] font-bold text-[#111111]">
                <span>보유 크레딧</span>
                <span>{myCredit.toLocaleString()}C</span>
              </div>
              <div className="flex justify-between text-[18px] text-[#666666]">
                <span>차감 예정 크레딧</span>
                <span>-{totalPrice.toLocaleString()}C</span>
              </div>
              <div className="flex justify-between text-[18px] font-bold">
                <span>차감 후 잔액</span>
                <span
                  className={isShortage ? 'text-red-primary' : 'text-[#00BA88]'}
                >
                  {afterCredit.toLocaleString()}C
                </span>
              </div>
            </div>

            <div className="flex justify-end items-center gap-[12px] mt-[24px] mb-auto">
              <span className="text-[13px] text-[#AAAAAA]">
                크레딧이 부족한가요?
              </span>
              <Link
                to="/CreditCharge"
                className="bg-[#0099FF] text-white px-[14px] py-[6px] text-[13px] font-bold rounded-[6px] no-underline hover:bg-[#0077CC] transition-colors duration-200"
              >
                크레딧 충전
              </Link>
            </div>

            <button
              type="button"
              onClick={handlePaymentSubmit}
              disabled={cart.length === 0 || isShortage}
              className={`w-full py-[20px] text-[20px] font-bold rounded-[16px] text-center border-none shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-all duration-200 ${
                cart.length > 0 && !isShortage
                  ? 'bg-red-primary text-white cursor-pointer hover:bg-[#D63F54]'
                  : 'bg-[#F1F3F5] text-[#AAAAAA] cursor-not-allowed'
              }`}
            >
              결제하기
            </button>
          </div>
          <Link
            to="/Paycard"
            className="dt:hidden w-[250px] py-[20px] text-[20px] bg-red-primary font-bold rounded-[16px] text-gray-0 text-center border-none shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-all duration-200 cursor-pointer"
          >
            결제하기
          </Link>
        </div>
      )}
    </div>
  );
};

export default Order;
