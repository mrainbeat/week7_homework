import Close from '../../assets/ion_close-outline.svg';
import ModalList from './ModalList';
import { StoreMockData } from '../../mocks/mock';

const FoodModal = ({ item, onClose, addToCart }) => {
  return (
    <div className="fixed bg-black/50 z-50 flex items-center justify-center inset-0">
      <div className="bg-white h-[667px] w-[738px] flex flex-col p-[40px]">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="font-bold text-[36px]">{item.name}</h3>
            <p className="text-[20px]">⭐️ {item.star}</p>
          </div>
          <img src={Close} alt="닫기" onClick={onClose} />
        </div>
        <hr className="border-[#CAC8C8] my-[40px]" />
        <div className="flex flex-col gap-[88px] overflow-y-auto pr-2 min-h-0 flex-1">
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
