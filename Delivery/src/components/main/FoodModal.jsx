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
    <div className="fixed bg-black/50 z-50 flex top-[83px] left-0 right-0 bottom-0 justify-center dt:items-center dt:inset-0">
      <div className="bg-white w-full h-full dt:h-[667px] dt:w-[738px] flex flex-col p-[40px] dt:rounded-xl">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-bold text-[36px]">{item.name}</h3>
            <p className="text-[20px]">⭐️ {item.star}</p>
          </div>
          <img src={Close} alt="닫기" onClick={onClose} />
        </div>
        <hr className="border-[#CAC8C8] my-[40px]" />
        <div className="flex flex-col gap-[60px] dt:gap-[88px] overflow-y-auto pr-2 min-h-0 flex-1 pb-[40px]">
          {item.menus.map((show) => (
            <ModalList
              key={show.id}
              id={show.id}
              name={show.name}
              detail={show.detail}
              price={show.price}
              storeName={item.name}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodModal;
