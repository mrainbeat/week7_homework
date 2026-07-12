import Close from '../../assets/ion_close-outline.svg';
import ModalList from './ModalList';
import { StoreMockData } from '../../mocks/mock';
import { useEffect } from 'react';

const FoodModal = ({ item, onClose, addToCart }) => {
  useEffect(() => {
    // 1. 현재 body의 원래 스타일을 저장해둠
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // 2. 모달이 열리면 body 스크롤을 숨김
    document.body.style.overflow = 'hidden';

    // 3. 컴포넌트가 언마운트 될 때 원래 스타일로 복구함
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="fixed z-50 flex top-[83px] left-0 right-0 bottom-0 dt:justify-center dt:items-center dt:inset-0">
      <div className="bg-white w-full h-full dt:h-[750px] dt:w-[1000px] flex flex-col p-[40px] dt:rounded-xl dt:border dt:border-gray-2 dt:border-[1px]">
        <div className="flex dt:justify-center relative items-center w-full pb-10 dt:pb-0">
          <div>
            <h3 className="font-bold text-[36px] text-left dt:text-center">
              {item.name}
            </h3>
          </div>
          <img
            src={Close}
            alt="닫기"
            onClick={onClose}
            className="absolute right-0 cursor-pointer"
          />
        </div>
        <hr className="hidden dt:block border-gray-2 my-[40px]" />
        <div className="flex flex-col gap-[60px] dt:gap-[88px] overflow-y-auto pr-2 min-h-0 flex-1 pb-[40px]">
          {item.menus.map((show) => (
            <ModalList
              key={show.menuId}
              menuId={show.menuId}
              name={show.name}
              description={show.description}
              price={show.price}
              storeName={item.name}
              addToCart={addToCart}
              options={show.options}
              isMultiple={show.isMultiple}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
