import React, { useEffect, useState } from 'react';
import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Order.css'; // 🌟 파낸 CSS 파일 연동

const Order = () => {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem('isLoggedIn');

  // 🛒 로컬스토리지에서 장바구니 상품 데이터 읽기
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 💳 선택된 결제 방법 상태
  const [paymentMethod, setPaymentMethod] = useState('');

  // 🛡️ 로그인 제한 가드
  useEffect(() => {
    if (loginStatus !== 'true') {
      navigate('/Login', { replace: true });
    }
  }, [loginStatus, navigate]);

  // 💰 총 결제 금액 실시간 계산
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-page-container">
      {/* 민준님이 주신 원래 Navbar 구조 100% 동일하게 유지 */}
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

      {/* 📦 메인 레이아웃 박스 */}
      <div className="order-main-content">
        {/* 🛒 왼쪽 섹션: 장바구니 목록 확인 */}
        <div className="cart-section">
          {cartItems.length === 0 ? (
            /* 1) 장바구니가 텅 비었을 때 */
            <div className="cart-empty-box">
              <p className="cart-empty-text">장바구니가 비어있습니다.</p>
              <Link to="/Menu" className="shopping-btn">
                쇼핑하러 가기
              </Link>
            </div>
          ) : (
            /* 2) 상품 데이터가 들어있을 때 */
            <div className="cart-list-card">
              <h3 className="cart-list-title">담은 상품</h3>
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item-row">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-meta">
                      {item.price.toLocaleString()}원 · {item.quantity}개
                    </span>
                  </div>
                  <span className="cart-item-total-price">
                    {(item.price * item.quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 💳 오른쪽 섹션: 결제 카드 레이어 */}
        <div className="payment-card">
          <h2 className="payment-title">결제하기</h2>

          <span className="payment-label">결제 방법</span>

          {/* 독립형 버튼 격자 그리드 구조 */}
          <div className="payment-method-grid">
            {['카카오페이', '네이버페이', '카드 결제', '무통장 입금'].map(
              (method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
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

          {/* 최종 결제하기 버튼 활성화 분기 처리 */}
          <button
            type="button"
            disabled={!paymentMethod || cartItems.length === 0}
            className={`submit-payment-btn ${
              paymentMethod && cartItems.length > 0 ? 'clickable' : 'disabled'
            }`}
          >
            {totalPrice === 0 ? '00,000' : totalPrice.toLocaleString()}원
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
