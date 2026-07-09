import { useState } from 'react';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import OptionList from './OptionList';

const ModalList = ({
  id,
  name,
  detail,
  price,
  storeName,
  addToCart,
  side,
  isMultiple,
}) => {
  const [selectedFood, setSelectedFood] = useState(false);
  const [count, setCount] = useState(1);

  //옵션 선택을 배열로 받기
  const [SelectedOptions, setSelectedOptions] = useState([]);

  const handleFoodClick = (option) => {
    setCount(1);
    setSelectedFood(false);

    //단일선택만 가능하다면( 예 : 대 중 소 중에 하나 고르기 등 )
    if (!isMultiple) {
      setSelectedOptions((prev) => {
        //이미 선택된거라면 취소하고, 아니라면 다른 옵션 키기
        const isExist = prev.find((item) => item.name === option.name);
        return isExist ? [] : [option];
      });
      return;
    }
    //복수 선택이 가능하다면(isMutiple === true 라면)
    setSelectedOptions((prev) => {
      //이미 배열이 들어있다면 -> isExist === ture
      const isExist = prev.find((item) => item.name === option.name);

      //이미 배열에 있다면 뺴고, 아니라면 추가
      if (isExist) {
        return prev.filter((item) => item.name !== option.name);
      } else {
        return [...prev, option];
      }
    });
  };
  //옵션 이름을 하나하나 정렬하여 - 로 연결하기
  const optionsString = SelectedOptions.map((option) => option.name)
    .sort()
    .join('-');

  //어떤 옵션을 선택했는지에 따라 돌려주는 ID를 달리한다
  const uniqueId = SelectedOptions.length > 0 ? `${id}-${optionsString}` : id;

  //reduce 함수로 전체 가격 더하기
  const optionTotalPrice = SelectedOptions.reduce(
    (sum, opt) => sum + opt.price,
    0
  );
  const totalPrice = price + optionTotalPrice;

  return (
    <div className="flex flex-col gap-5 dt:gap-10 dt:flex-row dt:justify-between">
      <div className="flex flex-col flex-1 min-w-0">
        <h6 className="text-[20px]">{name}</h6>
        <p className="text-[12px] mt-[7px] mb-[13px] text-gray-3">{detail}</p>
        <div className="flex gap-2 flex-wrap max-w-[200px] pb-2 scrollbar dt:overflow-x-auto dt:w-full dt:flex-nowrap dt:max-w-none">
          {side.map((show) => (
            <div className="shrink-0">
              <OptionList
                key={show.name}
                name={show.name}
                price={show.price}
                isSelected={SelectedOptions.some(
                  (option) => option.name === show.name
                )}
                onClick={() => handleFoodClick(show)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="dt:flex-row dt:items-center dt:gap-[24px] flex flex-col items-end gap-2 shrink-0">
        <p className="font-bold text-[20px]">{price.toLocaleString()}원</p>
        <div>
          {!selectedFood ? (
            <button
              onClick={() => {
                setSelectedFood(true);
                setCount(1);
                addToCart({
                  id: uniqueId,
                  originalID: id,
                  menuName: name,
                  price: totalPrice,
                  storeName,
                  quantity: 1,
                  side: side,
                  SelectedOptions: SelectedOptions,
                });
              }}
              className="px-[64px] py-[16px] w-[167px] h-[54px] rounded-lg mt-[12px] dt:my-[13px] bg-red-assistive cursor-pointer"
            >
              담기
            </button>
          ) : (
            <div className="flex gap-[32px] w-[155px] h-[56px] items-center">
              <button
                className="cursor-pointer"
                onClick={() => {
                  //수량 하나 빼기
                  if (count > 1) {
                    setCount(count - 1);
                    addToCart({
                      id: uniqueId,
                      originalID: id,
                      menuName: name,
                      price: totalPrice,
                      storeName,
                      quantity: -1,
                      side: side,
                      SelectedOptions: SelectedOptions,
                    });
                  } else {
                    setSelectedFood(false);
                    //1-1 해서 아예 0으로 만들기
                    addToCart({
                      id: uniqueId,
                      originalID: id,
                      menuName: name,
                      price: totalPrice,
                      storeName,
                      quantity: -1,
                      side: side,
                      SelectedOptions: SelectedOptions,
                    });
                  }
                }}
              >
                <img src={minus} alt="minus" />
              </button>
              <div className="text-[24px]">{count}</div>
              <button
                className="cursor-pointer"
                //수량 하나 더하기
                onClick={() => {
                  setCount(count + 1);
                  //수량 하나 더하기
                  addToCart({
                    id: uniqueId,
                    originalID: id,
                    menuName: name,
                    price: totalPrice,
                    storeName,
                    quantity: 1,
                    side: side,
                    SelectedOptions: SelectedOptions,
                  });
                }}
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalList;
