import '../../pages/Order.css';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import { useState } from 'react';
import remove from '../../assets/ion_close-outline.svg';

const CartList = ({ item, addToCart, removeCartItem, minusFromCart }) => {
  return (
    <div>
      <div
        key={item.id}
        className="py-[12px] px-[24px] flex flex-col items-center dt:flex-row justify-between"
      >
        <div className="flex flex-col">
          <span className="text-[24px]">{item.menuName}</span>
          <span className="text-[24px] text-[#F0485F]">
            {item.price.toLocaleString()}원
          </span>
        </div>
        <div className="flex gap-[32px] w-[199px] h-[56px] items-center">
          <button
            onClick={() => {
              //수량 하나 배기
              if (item.quantity > 1) {
                addToCart({
                  id: item.id,
                  menuName: item.menuName,
                  price: item.price,
                  storeName: item.storeName,
                  quantity: -1,
                });
              } else {
                removeCartItem(item.id);
              }
            }}
          >
            <img src={minus} alt="minus" />
          </button>
          <div className="text-[24px]">{item.quantity}</div>
          <button
            //수량 하나 더하기
            onClick={() => {
              addToCart({
                id: item.id,
                menuName: item.menuName,
                price: item.price,
                storeName: item.storeName,
                quantity: 1,
              });
            }}
          >
            <img src={plus} alt="plus" />
          </button>
          <button
            onClick={() => {
              removeCartItem(item.id);
            }}
          >
            <img src={remove} alt="remove" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
