import { useState } from 'react';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';

const ModalList = ({ id, name, detail, price, storeName, addToCart }) => {
  const [selectedFood, setSelectedFood] = useState(false);
  const [count, setCount] = useState(1);

  const handleFoodClick = (item) => {
    setSelectedFood(item); //클릭한 데이터 저장
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h6 className="text-[20px]">{name}</h6>
        <p className="text-[12px] mt-[7px] mb-[13px] text-[#858585]">
          {detail}
        </p>
        <p className="font-bold text-[20px]">{price.toLocaleString()}원</p>
      </div>
      <div>
        {!selectedFood ? (
          <button
            onClick={() => {
              setSelectedFood(true);
              setCount(1);
              addToCart({
                id,
                menuName: name,
                price,
                storeName,
                quantity: 1,
              });
            }}
            className="px-[64px] py-[16px] w-[167px] h-[54px] rounded-lg bg-[#FDF7C3] cursor-pointer"
          >
            담기
          </button>
        ) : (
          <div className="flex gap-[32px] w-[155px] h-[56px] items-center">
            <button
              onClick={() => {
                //수량 하나 배기
                if (count > 1) {
                  setCount(count - 1);
                  addToCart({
                    id,
                    menuName: name,
                    price,
                    storeName,
                    quantity: -1,
                  });
                } else {
                  setSelectedFood(false);
                  //1-1 해서 아예 0으로 만들기
                  addToCart({
                    id,
                    menuName: name,
                    price,
                    storeName,
                    quantity: -1,
                  });
                }
              }}
            >
              <img src={minus} alt="minus" />
            </button>
            <div className="text-[24px]">{count}</div>
            <button
              //수량 하나 더하기
              onClick={() => {
                setCount(count + 1);
                //수량 하나 더하기
                addToCart({
                  id,
                  menuName: name,
                  price,
                  storeName,
                  quantity: 1,
                });
              }}
            >
              <img src={plus} alt="plus" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalList;
