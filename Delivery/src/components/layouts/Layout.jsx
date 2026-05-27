//자식 라우트가 들어갈 자리를 비워두는 중첩 라우팅
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Layout = ({ cart = [], addToCart }) => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#F5F5F5] min-h-screen">
        <Outlet context={{ cart, addToCart }} />
      </div>
    </div>
  );
};

export default Layout;
