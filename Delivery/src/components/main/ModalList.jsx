import { useState } from 'react';
import minus from '../../assets/minus.svg';
import plus from '../../assets/plus.svg';
import OptionList from './OptionList';

//!!!! +/- 버튼을 누르자마자 장바구니에 담기는건 너무 비효율적인거같아서.. 수량을 수정하고 최종 수량만 서버로 보내도록 수정함! UI 수정사항도 있으니 참고바랍니다..ㅎㅎ (너무별로면 말좀해주세요(!!!! 하고 적힌 내용들은 보면 지워주세요)))

const ModalList = ({
  menuId,
  name,
  description,
  price,
  storeName,
  addToCart,
  options,
  isMultiple,
  updateCartQuantity,
  removeCartItem,
}) => {
  const [selectedFood, setSelectedFood] = useState(false);
  const [count, setCount] = useState(1);

  //옵션 선택을 배열로 받기
  const [selectedOptions, setSelectedOptions] = useState([]);

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
  const optionsString = selectedOptions
    .map((option) => option.name)
    .sort()
    .join('-');

  //어떤 옵션을 선택했는지에 따라 돌려주는 ID를 달리한다
  const uniqueId =
    selectedOptions.length > 0 ? `${menuId}-${optionsString}` : menuId;

  //reduce 함수로 전체 가격 더하기
  const optionTotalPrice = selectedOptions.reduce(
    (sum, opt) => sum + opt.additionalPrice,
    0
  );
  const totalPrice = price + optionTotalPrice;

  //받아올때랑 보낼때 필드명이 달라서 교체
  const formattedOptionsForCart = selectedOptions.map((opt) => ({
    name: opt.name,
    price: opt.additionalPrice,
  }));

  //한번에 통일
  const handleFinalSendToCart = (finalCount) => {
    addToCart({
      cartItemId: uniqueId,
      originalID: menuId,
      menuName: name,
      price: totalPrice,
      storeName,
      quantity: count,
      options: options,
      selectedOptions: selectedOptions,
    });
  };

  return (
    <div className="flex flex-col gap-5 dt:gap-10 dt:flex-row dt:justify-between">
      <div className="flex flex-col flex-1 min-w-0">
        <h6 className="text-[20px]">{name}</h6>
        <p className="text-[12px] mt-[7px] mb-[13px] text-gray-3">
          {description}
        </p>
        <div className="flex gap-2 flex-wrap max-w-[200px] pb-2 scrollbar dt:overflow-x-auto dt:w-full dt:flex-nowrap dt:max-w-none">
          {options?.map((show) => (
            <div key={show.menuOptionId} className="shrink-0">
              <OptionList
                name={show.name}
                price={show.additionalPrice}
                isSelected={selectedOptions.some(
                  (option) => option.name === show.name
                )}
                onClick={() => handleFoodClick(show)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="dt:flex-row dt:items-center dt:gap-[40px] flex flex-col items-end gap-2 shrink-0">
        <p className="font-bold text-[20px]">{totalPrice.toLocaleString()}원</p>
        <div>
          {!selectedFood ? (
            <button
              onClick={() => {
                setSelectedFood(true);
                setCount(1);
              }}
              className="px-[64px] py-[16px] w-[167px] h-[54px] rounded-lg mt-[12px] dt:my-[13px] bg-red-assistive cursor-pointer"
            >
              담기
            </button>
          ) : (
            <div className="flex flex-col gap-1 items-center w-full">
              <div className="flex gap-[20px] w-[167px] h-[56px] items-center justify-between">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    if (count > 1) {
                      setCount((prev) => prev - 1);
                    } else {
                      setSelectedFood(false);
                      //이후 다시 담을때 사용할 1
                      setCount(1);
                    }
                  }}
                  /*수량 하나 빼기
                    onClick = { () => 
                    if (count > 1) {
                      setCount(count - 1);
                      handleSendToCart(count - 1);
                    } else {
                      setSelectedFood(false);
                      handleSendToCart(0);
                    }}*/
                >
                  <img src={minus} alt="minus" />
                </button>
                <div className="text-[24px]">{count}</div>
                <button
                  className="cursor-pointer"
                  onClick={() => setCount((prev) => prev + 1)}
                  //수량 하나 더하기
                  /*onClick={() => {
                    setCount(count + 1);
                    //수량 하나 더하기
                    handleSendToCart(count + 1);
                  }}*/
                >
                  <img src={plus} alt="plus" />
                </button>
              </div>
              <div>
                <button
                  className="w-[167px] h-[40px] bg-red-assistive cursor-pointer rounded text-[15px]"
                  onClick={() => {
                    handleFinalSendToCart();
                    setSelectedFood(false);
                  }}
                >
                  담기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalList;
