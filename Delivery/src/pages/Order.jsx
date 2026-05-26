import React, { useEffect, useState } from 'react';
import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';
import PayCard from '../components/Cart/PayCard';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CartList from '../components/Cart/CartList';
import './Order.css';

const Order = ({ cart = [], addToCart, removeCartItem }) => {
  const navigate = useNavigate();
  const loginStatus = localStorage.getItem('isLoggedIn');

  // 선택된 결제 방법 상태
  const [paymentMethod, setPaymentMethod] = useState('');

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

  // 장바구니 데이터를 가게이름 기준으로 하나로 축소하기
  // reduce(누적할 배열, 현재 아이템) -> return 다음으로 넘길 값
  const groupedCart = cart.reduce((groups, item) => {
    if (!groups[item.storeName]) {
      groups[item.storeName] = [];
      //새로운 가게라면 빈배열을 생성함
    }
    groups[item.storeName].push(item);
    return groups;
  }, {});

  return (
    <div className="order-page-container">
      <Navbar
        totalPrice={totalPrice} // 📌 이거 한 줄 추가
        cartLength={cart.length} // 📌 이거 한 줄 추가
        left={
          <div className="flex gap-[48px] items-center">
            <Link to="/Menu" className="cursor-pointer">
              <img src={Leftarrow} alt="왼쪽화살표" />
            </Link>
            <span className="text-[36px] font-bold">장바구니</span>
          </div>
        }
      />

      {/* 메인 레이아웃 박스 */}
      <div className="order-main-content">
        {/* 왼쪽 섹션: 장바구니 목록 확인 */}
        <div className="cart-section">
          {cart.length === 0 ? (
            /* 1) 장바구니가 텅 비었을 때 */
            <div className="cart-empty-box">
              <p className="cart-empty-text">장바구니가 비어있습니다.</p>
              <Link to="/Menu" className="shopping-btn">
                쇼핑하러 가기
              </Link>
            </div>
          ) : (
            /* 2) 상품 데이터가 들어있을 때 */
            <div className="rounded-lg flex flex-col gap-[51px] mt-[83px] dt:mt-[5px]">
              {Object.keys(groupedCart).map((storeName) => (
                <div className="bg-white rounded-xl overflow-hidden">
                  <div className="bg-[#FDF7C3] text-[20px] py-[12px] px-[24px] ">
                    <h4>{storeName}</h4>
                  </div>
                  <div>
                    {groupedCart[storeName].map((item) => (
                      <CartList
                        item={item}
                        addToCart={addToCart}
                        removeCartItem={removeCartItem}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/*  오른쪽 섹션: 결제 카드 레이어 */}
        <div className="hidden dt:block">
          <PayCard cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Order;
