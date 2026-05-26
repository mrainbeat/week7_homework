import cart from '../../assets/cart.svg';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ left, right }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 w-full text-white">
      <div className="h-[83px] flex items-center justify-between px-[40px] bg-[#F0485F]">
        <div>{left}</div>
        <div className="dt:flex gap-[38px] items-center hidden ">{right}</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="dt:hidden text-2xl cursor-pointer h-[24px] w-[24px]"
        >
          {isOpen ? 'X' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div
          className="dt:hidden w-full flex flex-col bg-[#FDF7C3] dt:pt-[83px] pt-[19px] h-[calc(100vh-83px)] ml-[139px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="flex flex-col items-center gap-4 text-[#F0485F]"
            onClick={(e) => e.stopPropagation()}
          >
            {right}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
