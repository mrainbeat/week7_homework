import React, { useEffect, useState } from 'react';
import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import CartList from '../components/Cart/CartList';

const Order = ({ cart = [], addToCart, removeCartItem }) => {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem('isLoggedIn');

  // 모바일 화면에서 장바구니(false)와 결제창(true)을 스위칭하는 상태
  const [isPayView, setIsPayView] = useState(false);

  // 로그인 여부 체크
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus === 'true');
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('myCart');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    localStorage.removeItem('myCredit'); // 로그아웃 시 크레딧 초기화
    setIsLoggedIn(false);
  };

  // 로그인 제한 가드
  useEffect(() => {
    if (loginStatus !== 'true') {
      navigate('/Login', { replace: true });
    }
  }, [loginStatus, navigate]);

  // 로컬스토리지에서 유저의 보유 크레딧 읽기 (기본값 5000C)
  const [myCredit, setMyCredit] = useState(() => {
    const savedCredit = localStorage.getItem('myCredit');
    return savedCredit ? Number(savedCredit) : 5000;
  });

  // 총 결제 금액 실시간 계산 (수량은 quantity 필드로 정상 연동 중)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 차감 후 잔액 계산 및 부족 여부 판별
  const afterCredit = myCredit - totalPrice;
  const isShortage = afterCredit < 0;

  // 장바구니 데이터를 가게 이름 기준으로 그룹화
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

    // 3. 완료 페이지로 이동
    window.location.href = '/CompleteOrder';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col pt-[83px] dt:pt-0">
      <Navbar
        totalPrice={totalPrice}
        cartLength={cart.length}
        left={
          <div className="flex gap-[48px] items-center">
            {isPayView ? (
              <button
                type="button"
                onClick={() => setIsPayView(false)}
                className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
              >
                <img src={Leftarrow} alt="뒤로가기" />
              </button>
            ) : (
              <Link to="/Menu" className="cursor-pointer">
                <img src={Leftarrow} alt="메뉴로 돌아가기" />
              </Link>
            )}
            <span className="text-[36px] font-bold">
              {isPayView ? '결제하기' : '장바구니'}
            </span>
          </div>
        }
        right={
          <div className="text-black flex flex-col pr-5 items-end">
            <Link to="/Order" className="dt:hidden cursor-pointer text-[20px]">
              장바구니
            </Link>
            <Link
              to="/CreditCharge"
              className="dt:hidden cursor-pointer text-[20px]"
            >
              크레딧 충전
            </Link>
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
        <div className="flex-1 flex flex-col dt:flex-row items-center justify-center gap-[69px] w-full dt:w-[1200px] h-auto dt:h-[604px] mx-auto box-border p-[20px] dt:p-0 my-[40px] dt:my-0">
          {/* 왼쪽 섹션: 장바구니 영역 */}
          <div
            className={`w-full dt:w-[563px] h-auto dt:h-[604px] flex flex-col box-border ${isPayView ? 'max-dt:hidden' : ''}`}
          >
            <div className="w-full h-auto dt:h-full bg-transparent flex flex-col box-border dt:overflow-y-auto">
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
                          // key 값을 item.id 대신 item.cartItemId로 변경
                          key={item.cartItemId}
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
          <div
            className={`w-full dt:w-[568px] h-auto dt:h-[604px] bg-white rounded-[32px] p-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#F8F9FA] flex-col box-border ${isPayView ? 'flex' : 'hidden dt:flex'}`}
          >
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

            <div className="w-full bg-[#F8F9FA] rounded-[12px] p-[24px] flex flex-col gap-[16px] box-border">
              <div className="flex justify-between text-[20px] font-bold text-[#111111]">
                <span>보유 크레딧</span>
                <span>{myCredit.toLocaleString()}C</span>
              </div>
              <div className="flex justify-between text-[18px] font-bold text-green-primary">
                <span>차감 후 잔액</span>
                <span
                  className={
                    isShortage ? 'text-red-primary' : 'text-green-primary'
                  }
                >
                  {afterCredit.toLocaleString()}C
                </span>
              </div>
              <div className="flex justify-between text-[18px] text-[#666666]">
                <span>차감 예정 크레딧</span>
                <span>-{totalPrice.toLocaleString()}C</span>
              </div>
            </div>

            <div className="flex justify-end items-center gap-[12px] mt-[24px] mb-auto max-dt:mb-[40px]">
              <span className="text-[13px] text-[#AAAAAA]">
                크레딧이 부족한가요?
              </span>
              <Link
                to="/CreditCharge"
                className="bg-green-primary text-white px-[14px] py-[6px] text-[13px] font-bold rounded-[6px] no-underline hover:bg-[#0077CC] transition-colors duration-200"
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

          {!isPayView && (
            <button
              type="button"
              onClick={() => setIsPayView(true)}
              className="dt:hidden w-[250px] py-[20px] text-[20px] bg-red-primary font-bold rounded-[16px] text-gray-0 text-center border-none shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-all duration-200 cursor-pointer mt-[24px]"
            >
              결제하러 가기
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
