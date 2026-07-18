import React from 'react';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import remove from '../../assets/ion_close-outline.svg';
import OptionList from '../main/OptionList';
import api from '../../api/axios';

//!!!! app.jsx 에서 만든 함수를 여기에도 사용하도록 수정!!
const CartList = ({
  item,
  onCartUpdate,
  updateCartQuantity,
  removeCartItem,
}) => {
  const token = localStorage.getItem('accessToken');

  // [PATCH] 수량 변경 -> updateCartQauntity 사용
  const handleUpdateQuantity = async (newQuantity) => {
    const targetItemId = Number(item.cartItemId || item.id);
    updateCartQuantity(targetItemId, newQuantity);
  };

  // [DELETE] 항목 삭제 -> removeCartItem 사용
  const handleDelete = async () => {
    if (!window.confirm('이 메뉴를 장바구니에서 삭제하시겠습니까?')) return;

    const targetItemId = Number(item.cartItemId || item.id);
    removeCartItem(targetItemId);
  };

  // 🌟 백엔드가 주는 가격 이름이 다를 수 있으므로 안전하게 모두 탐색
  const displayPrice =
    item.itemTotalPrice ?? item.totalPrice ?? item.price ?? item.basePrice ?? 0;

  // 🌟 백엔드가 주는 옵션 배열 이름 탐색
  const itemOptions = item.options ?? item.menuOptions ?? [];

  return (
    <div>
      <div className="py-[12px] px-[24px] flex flex-col w-full dt:items-center dt:flex-row justify-between">
        <div className="flex flex-col flex-1 gap-1">
          <span className="text-[24px]">{item.menuName}</span>

          {/* 옵션이 배열 형태로 존재하면 모두 그려줍니다 */}
          {itemOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {itemOptions.map((option, index) => (
                <OptionList
                  key={index}
                  name={option.name ?? option.optionName}
                  price={option.price ?? option.additionalPrice ?? 0}
                  isSelected={true}
                  onClick={() => {}}
                />
              ))}
            </div>
          )}

          {/* 가격 표시 */}
          <span className="text-[24px] text-black font-bold">
            {displayPrice.toLocaleString()}원
          </span>
        </div>

        <div className="flex gap-[32px] w-[199px] h-[56px] items-center">
          <button
            type="button"
            className="cursor-pointer bg-transparent border-none p-0"
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
          >
            <img src={minus} alt="수량 감소" />
          </button>

          <div className="text-[24px] font-bold">{item.quantity}</div>

          <button
            type="button"
            className="cursor-pointer bg-transparent border-none p-0"
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
          >
            <img src={plus} alt="수량 증가" />
          </button>

          <button
            type="button"
            className="cursor-pointer bg-transparent border-none p-0 ml-2"
            onClick={handleDelete}
          >
            <img src={remove} alt="장바구니에서 삭제" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
