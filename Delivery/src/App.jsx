import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Layout from './components/layouts/Layout';
import NotFound from './pages/NotFound';

function App() {
  //모든 음식을 담을 리스트 만들기
  const [cart, setCart] = useState(() => {
    //로컬스토리지에 저장된 데이터가 있으면 시작할 떄 저장된 데이터부터 시작하고, 아니면 빈배열부터 시작하도록 함
    const saveCart = localStorage.getItem('myCart');
    return saveCart ? JSON.parse(saveCart) : [];
  });

  const addToCart = (newItem) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === newItem.id);
      let updatedCart = [];
      //만약에 장바구니에 이미 해당 item 이 있다면, map으로 돌아보면서 그 아이템의 선택량을 바꿈
      if (isExist) {
        updatedCart = prev.map((item) =>
          item.id === newItem.id
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
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/Menu" replace />} />
          <Route path="Menu" element={<Menu addToCart={addToCart} />}></Route>
          <Route
            path="Order"
            element={<Order cart={cart} addToCart={addToCart} />}
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
