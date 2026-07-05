import '../../pages/Order.css';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import { useState } from 'react';
import remove from '../../assets/ion_close-outline.svg';
import SideList from '../main/SideList';

const CartList = ({ item, addToCart, removeCartItem }) => {
  return (
    <div>
      <div
        key={item.id}
        className="py-[12px] px-[24px] flex flex-col w-full items-center dt:flex-row justify-between"
      >
        <div className="flex flex-col flex-1 gap-1">
          <span className="text-[24px]">{item.menuName}</span>
          {item.side && item.side.length > 0 && (
            <div className="flex flex-wrap">
              {item.side
                //필터링하기
                .filter((show) => item.SelectedOption?.name === show.name)
                //true 인 애만 보이도록
                .map((show) => (
                  <SideList
                    key={show.name}
                    name={show.name}
                    price={show.price}
                    isSelected={true}
                    onClick={() => {}}
                  />
                ))}
            </div>
          )}
          <span className="text-[24px] text-black">
            {item.price.toLocaleString()}원
          </span>
        </div>
        <div className="flex gap-[32px] w-[199px] h-[56px] items-center">
          <button
            className="cursor-pointer"
            onClick={() => {
              //수량 하나 빼기
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
            className="cursor-pointer"
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
            className="cursor-pointer"
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
