import React, { useState } from 'react';
import Navbar from '../../components/layouts/Navbar';
import { Link, useLocation } from 'react-router-dom';
import Leftarrow from '../../assets/fa-solid_arrow-left.svg';
import CompleteOrder from '../../pages/CompleteOrder';
import Payment from './Payment';

// 부모로부터 마스터 데이터를 다이렉트로 상속받습니다.
const PayCard = ({ cart = [] }) => {
  const loginStatus = localStorage.getItem('isLoggedIn');

  //로그인 여부 체크하기
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus === 'true');
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('IsLoggedIn');
    setIsLoggedIn(false);
  };

  const [paymentMethod, setPaymentMethod] = useState('');
  // 총 결제 금액 실시간 계산
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="bg-white overflow-hidden h-screen w-full dt:h-[604px] dt:w-[568px] dt:rounded-[20px]">
      <Navbar
        left={
          <div className="flex gap-[48px] items-center">
            <Link to="/Order" className="cursor-pointer">
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
      <div className="flex flex-col items-center h-full w-full py-[83px] px-[24px] justify-center bg-white gap-4">
        <h2 className="text-[36px] font-blod">결제하기</h2>
        <div className="flex flex-col items-center justify-center gap-4">
          <span className="w-full text-left text-red-primary">결제 방법</span>

          {/* 결제 수단 버튼 구조 */}
          <div className="grid grid-cols-1 dt:grid-cols-2 gap-4 ">
            {['카카오페이', '네이버페이', '카드 결제', '무통장 입금'].map(
              (method) => (
                <Payment
                  onClick={() => {
                    setPaymentMethod(method);
                  }}
                  paymentMethod={paymentMethod}
                  id={method}
                  key={method}
                />
              )
            )}
          </div>

          {/* 결제금액 표기 */}
          <div className="flex flex-row justify-between w-full mt-[92px] dt:mt-[120px] text-[20px] font-bold">
            <span>총 결제금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>

          {/* 최종 결제하기 버튼 */}
          <Link
            to={!paymentMethod || cart.length === 0 ? '#' : '/CompleteOrder'}
            onClick={(e) => {
              if (!paymentMethod || cart.length === 0) {
                e.preventDefault();
              }
            }}
            className={`flex items-center justify-center text-center cursor-pointer mt-[92px] dt:mt-[28px] rounded-[16px] text-white text-[20px] px-[35px] py-[12px] dt:px-[55px] dt:py-[15px] h-[78px] w-[177px] dt:h-[54px] dt:w-[303px] ${!paymentMethod || cart.length === 0 ? 'bg-[#CCCCCC]' : 'bg-red-primary'}`}
          >
            {totalPrice === 0 ? '0' : totalPrice.toLocaleString()}원 결제하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PayCard;
