import React, { useState } from 'react';
import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const CreditCharge = () => {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem('isLoggedIn');

  //로그인 여부 체크하기
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus === 'true');
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('IsLoggedIn');
    setIsLoggedIn(false);
  };

  // 현재 보유 크레딧 불러오기
  const [myCredit, setMyCredit] = useState(() => {
    const savedCredit = localStorage.getItem('myCredit');
    return savedCredit ? Number(savedCredit) : 5000;
  });

  // 사용자가 선택한 충전 금액 상태
  const [chargeAmount, setChargeAmount] = useState(0);

  // 금액 누적 함수
  const handleAddAmount = (amount) => {
    setChargeAmount((prev) => prev + amount);
  };

  // 선택 금액 초기화 함수
  const handleResetAmount = () => {
    setChargeAmount(0);
  };

  // 충전하기 버튼 클릭 핸들러
  const handleChargeSubmit = () => {
    if (chargeAmount <= 0) {
      alert('충전할 금액을 선택해 주세요.');
      return;
    }

    const updatedCredit = myCredit + chargeAmount;
    localStorage.setItem('myCredit', String(updatedCredit));
    setMyCredit(updatedCredit);

    alert(`${chargeAmount.toLocaleString()} 크레딧이 충전되었습니다.`);
    navigate('/Order');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar
        left={
          <div className="flex gap-[48px] items-center">
            {/* 고정 링크 대신 히스토리 백(-1)을 적용하여 직전 페이지로 동적 이동 */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
            >
              <img src={Leftarrow} alt="뒤로가기" />
            </button>
            <span className="text-[36px] font-bold">크레딧 충전</span>
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

      <div className="flex-1 flex items-center justify-center w-[1200px] h-[604px] mx-auto box-border max-xl:w-full max-xl:h-auto max-xl:p-[20px]">
        <div className="w-[568px] h-[604px] bg-white rounded-[32px] p-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#F8F9FA] flex flex-col box-border mx-auto max-xl:w-full max-xl:h-auto">
          <h2 className="text-[36px] font-black text-center text-[#111111] mb-[40px]">
            크레딧 충전하기
          </h2>

          {/* 버튼들 윗공간: 멘트는 지우고 초기화 버튼만 우측 정렬로 자연스럽게 배치 */}
          <div className="flex justify-end h-[24px] mb-[12px]">
            {chargeAmount > 0 && (
              <button
                type="button"
                onClick={handleResetAmount}
                className="text-[14px] text-[#A0A0A0] hover:text-[#555555] transition-colors duration-200 cursor-pointer underline underline-offset-4"
              >
                초기화
              </button>
            )}
          </div>

          {/* 1. 상단 가로 일렬 충전 금액 선택 버튼 배열 */}
          <div className="flex gap-[12px] justify-between mb-[36px]">
            {[1000, 3000, 5000, 10000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleAddAmount(amount)}
                className="flex-1 py-[12px] text-[16px] font-bold rounded-[8px] border border-transparent bg-[#F8F9FA] text-[#555555] hover:bg-[#7BC4A4] hover:text-white transition-all duration-200 cursor-pointer text-center"
              >
                +{amount.toLocaleString()}C
              </button>
            ))}
          </div>

          {/* 2. 연회색 요약 정보 상자 영역 */}
          <div className="w-full bg-[#F8F9FA] rounded-[12px] p-[24px] flex flex-col gap-[16px] box-border mb-[40px]">
            <div className="flex justify-between text-[16px] font-bold text-[#111111]">
              <span>보유 크레딧</span>
              <span>{myCredit.toLocaleString()}C</span>
            </div>

            <div className="flex justify-between text-[16px] font-bold text-[#F0485F]">
              <span>충전 후 크레딧</span>
              <span>{(myCredit + chargeAmount).toLocaleString()}C</span>
            </div>
          </div>

          {/* 3. 하단 실시간 결제 금액 표시 구역 */}
          <div className="flex justify-between items-center mb-[40px]">
            <span className="text-[18px] font-bold text-[#111111]">
              결제금액
            </span>
            <span className="text-[22px] font-black text-[#111111]">
              {chargeAmount === 0 ? '0' : chargeAmount.toLocaleString()}원
            </span>
          </div>

          {/* 4. 최종 하단 충전하기 버튼 */}
          <button
            type="button"
            onClick={handleChargeSubmit}
            disabled={chargeAmount <= 0}
            className={`w-full py-[20px] text-[20px] font-bold rounded-[16px] text-center border-none shadow-[0_4px_6px_rgba(0,0,0,0.02)] transition-all duration-200 mt-auto ${
              chargeAmount > 0
                ? 'bg-[#F0485F] text-white cursor-pointer hover:bg-[#D63F54]'
                : 'bg-[#F1F3F5] text-[#AAAAAA] cursor-not-allowed'
            }`}
          >
            충전하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCharge;
