import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Layout from './components/layouts/Layout';
import NotFound from './pages/NotFound';
import CompleteOrder from './pages/CompleteOrder';
import CreditCharge from './pages/CreditCharge';
import api from './api/axios';

//
function App() {
  //모든 음식을 담을 리스트 만들기
  const [cart, setCart] = useState(() => {
    //로컬스토리지에 저장된 데이터가 있으면 시작할 떄 저장된 데이터부터 시작하고, 아니면 빈배열부터 시작하도록 함
    const saveCart = localStorage.getItem('myCart');
    return saveCart ? JSON.parse(saveCart) : [];
  });

  //서버에 있는 카트 정보 받아와서 저장하기
  const fetchAndSetCart = async (token) => {
    try {
      const cartResponse = await api.get('/api/carts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const serverCart = cartResponse.data.data.stores || [];

      //상태 동기화
      localStorage.setItem('myCart', JSON.stringify(serverCart));
      setCart(serverCart);

      console.log('장바구니 동기화 성공 :', serverCart);
    } catch (error) {
      console.error('서버 장바구니 가져오기 실패', error);
    }
  };
  //!!!!! 함수를 원래는 addToCart로 통일해서 담고 삭제하고 더하고 했는데, 나누기로함!

  //1. 장바구니에 아이템 담는 함수
  const addToCart = async (newItem) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('accessToken');

    if (!isLoggedIn || !token) {
      alert('로그인 후 이용해주세요.');
      //해당 페이지에서 navigate는 사용불가
      window.location.href = '/Login';
      return;
    }

    try {
      console.log('서버로 POST 통신 보내기');
      //백엔드 서버에 POST 통신 보내기
      const requestBody = {
        menuId: newItem.originalID,
        quantity: newItem.quantity,
        menuOptionIds: newItem.selectedOptions.map((opt) => opt.menuOptionId),
      };

      const response = await api.post('/api/carts/items', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('서버 장바구니에 담기 성공 : ', response.data);

      await fetchAndSetCart(token);
    } catch (error) {
      console.error('장바구니 담기 API 실패', error);
    }
  };

  //2. 장바구니 페이지에서 수량 플러스/마이너스 할 때 사용하는 함수
  const updateCartQuantity = async (cartItemId, newQuantity) => {
    const token = localStorage.getItem('accessToken');
    //토큰 없으면 패스
    if (!token) return;

    //수량이 0이하가 된다면 자동으로 삭제
    if (newQuantity <= 0) {
      await removeCartItem(cartItemId);
      return;
    }

    try {
      console.log(
        `서버 수량 변경 요청 (ID:${cartItemId}, 수량 : ${newQuantity})`
      );

      await api.patch(
        `/api/carts/items/${cartItemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //장바구니 상품 수량 조절 후 최신 장바귄 데이터로 새로고침
      await fetchAndSetCart(token);
    } catch (error) {
      console.error('장바구니 수량 변경 API 실패', error);
    }
  };

  //3. 서버에서 아예 아이템을 삭제하는 함수
  const removeCartItem = async (cartItemId) => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      console.log(`서버 아이템 삭제 요청 (ID:${cartItemId})`);
      await api.delete(`/api/carts/items/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 삭제 성공 후 최신 장바구니 데이터로 새로고침
      await fetchAndSetCart(token);
    } catch (error) {
      console.error('장바구니 아이템 삭제 API 실패', error);
    }
  };

  //카트에 있었던 모든 아이템을 삭제(로그아웃시 사용)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('myCart');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Login"
          element={<Login onLoginSuccess={fetchAndSetCart} />}
        ></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/CompleteOrder" element={<CompleteOrder />} />
        <Route path="/CreditCharge" element={<CreditCharge />} />
        <Route
          path="/"
          element={
            <Layout cart={cart} addToCart={addToCart} clearCart={clearCart} />
          }
        >
          <Route index element={<Navigate to="/Menu" replace />} />
          <Route path="Menu" element={<Menu />}></Route>
          <Route
            path="Order"
            element={
              <Order
                cart={cart}
                updateCartQuantity={updateCartQuantity}
                removeCartItem={removeCartItem}
                clearCart={clearCart}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
