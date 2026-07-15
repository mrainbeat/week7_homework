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

function App() {
  //모든 음식을 담을 리스트 만들기
  const [cart, setCart] = useState(() => {
    //로컬스토리지에 저장된 데이터가 있으면 시작할 떄 저장된 데이터부터 시작하고, 아니면 빈배열부터 시작하도록 함
    const saveCart = localStorage.getItem('myCart');
    return saveCart ? JSON.parse(saveCart) : [];
  });

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
      console.log('📡 서버로 POST 통신 시도 중...');
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

      setCart((prev) => {
        // item.id 대신 item.cartitem으로 교체
        const isExist = prev.find(
          (item) => item.cartItemId === newItem.cartItemId
        );
        let updatedCart = [];
        //만약에 장바구니에 이미 해당 item 이 있다면, map으로 돌아보면서 그 아이템의 선택량을 바꿈
        if (isExist) {
          updatedCart = prev.map((item) =>
            // item.id 대신 item.cartitem으로 교체
            item.cartItemId === newItem.cartItemId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          );
        }
        //장바구니에 없는 아이템이었다면 그냥 그대로 배열에 새로 추가
        else {
          updatedCart = [...prev, newItem];
        }

        localStorage.setItem('myCart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    } catch (error) {
      console.error('장바구니 담기 API 실패', error);
    }
  };

  //아예 삭제하는 함수
  const removeCartItem = (cartItemId) => {
    setCart((prev) => {
      // item.id 대신 item.cartitem으로 교체
      const updatedCart = prev.filter((item) => item.cartItemId !== cartItemId);

      localStorage.setItem('myCart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  //카트에 있었던 모든 아이템을 삭제(로그아웃시 사용)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('myCart');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
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
                addToCart={addToCart}
                removeCartItem={removeCartItem}
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
