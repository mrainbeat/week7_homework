import { useState } from 'react';

const ModalList = ({ id, name, detail, price }) => {
  const [selectedFood, setSelectedFood] = useState(false);
  const [count, setCount] = useState(1);

  const handleFoodClick = (item) => {
    setSelectedFood(item); //클릭한 데이터 저장
  };
  return (
    <div className="flex justify-between">
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
            onClick={() => setSelectedFood(true)}
            className="px-[64px] py-[16px] w-[167px] h-[54px] rounded-lg bg-[#FDF7C3] cursor-pointer"
          >
            담기
          </button>
        ) : (
          <div className="flex">
            <button
              onClick={() => {
                if (count > 1) setCount(count - 1);
                else setSelectedFood(false);
              }}
            >
              -
            </button>
            <div>{count}</div>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalList;
