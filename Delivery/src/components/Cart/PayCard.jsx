import React, { useState } from 'react';
import Navbar from '../../components/layouts/Navbar';
import { Link, useLocation } from 'react-router-dom';
import Leftarrow from '../../assets/fa-solid_arrow-left.svg';
import '../../pages/Order.css';
import CompleteOrder from '../../pages/CompleteOrder';

// 부모로부터 마스터 데이터를 다이렉트로 상속받습니다.
const PayCard = ({ cart = [] }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  // 총 결제 금액 실시간 계산
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="payment-card h-full">
      <Navbar
        left={
          <div className="flex gap-[48px] items-center">
            <Link to="/Menu" className="cursor-pointer">
              <img src={Leftarrow} alt="왼쪽화살표" />
            </Link>
            <span className="text-[36px] font-bold">장바구니</span>
          </div>
        }
      />
      <h2 className="payment-title">결제하기</h2>

      <span className="payment-label">결제 방법</span>

      {/* 결제 수단 버튼 구조 */}
      <div className="payment-method-grid">
        {['카카오페이', '네이버페이', '카드 결제', '무통장 입금'].map(
          (method) => (
            <button
              key={method}
              type="button"
              className={`method-btn ${paymentMethod === method ? 'active' : ''}`}
            >
              {method}
            </button>
          )
        )}
      </div>

      {/* 결제금액 표기 */}
      <div className="price-summary-row">
        <span className="price-summary-label">총 결제금액</span>
        <span className="price-summary-value">
          {totalPrice.toLocaleString()}원
        </span>
      </div>

      {/* 최종 결제하기 버튼 */}
      <Link
        to="/CompleteOrder"
        disabled={!paymentMethod || cartLength === 0}
        className={`submit-payment-btn ${
          paymentMethod && cartLength > 0 ? 'clickable' : 'disabled'
        } cursor-pointer`}
      >
        {totalPrice === 0 ? '0' : totalPrice.toLocaleString()}원 결제하기
      </Link>
    </div>
  );
};

export default PayCard;
