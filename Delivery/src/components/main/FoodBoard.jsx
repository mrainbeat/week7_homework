import FoodCard from './FoodCard';
import { StoreMockData } from '../../mocks/mock';
import { useState } from 'react';
import FilterButton from './FilterButton';
import FoodModal from './FoodModal';

const FoodBoard = ({ addToCart, cart }) => {
  const [category, setCategory] = useState('전체');
  const categories = ['전체', '중식', '한식', '기타'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (item) => {
    setSelectedMenu(item); //클릭한 데이터 저장
    setIsModalOpen(true); //모달 열기
  };

  const handleMenuClose = (item) => {
    setSelectedMenu(null);
    setIsModalOpen(false);
  };

  // 각 아이템의 타입과 현재 카테고리 타입을 비교후 열치하는 타입만 필터링하기
  // 기타 선택 시 한/중식 외의 음식만 필터링하도록 만들기
  const filteredFoods = () => {
    if (category === '전체') {
      return StoreMockData;
    }
    if (category === '기타') {
      return StoreMockData.filter(
        (item) => item.type !== '한식' && item.type !== '중식'
      );
    }
    return StoreMockData.filter((item) => item.type === category);
  };

  return (
    <div className="max-w-[280px] min-h-[794px] pt-[135px]  dt:max-w-[1200px] dt:min-h-[775px] dt:pt-[201px] mx-auto">
      <div className="flex gap-[24px] mb-[72px] text-white items-center overflow-x-auto">
        {categories.map((item) => (
          <FilterButton
            key={item}
            category={item}
            active={category === item}
            // 현재 선택된 버튼인지 여부를 감지함, onclick시 category변수가 변경됨
            onClick={() => setCategory(item)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 dt:grid-cols-4 gap-x-[24px] gap-y-8 pb-10">
        {filteredFoods().map((item) => (
          <FoodCard
            key={item.id}
            name={item.name}
            star={item.star}
            type={item.type}
            image={item.image}
            //누르면 열리도록 ture로 만듦
            onClick={() => handleMenuClick(item)}
          />
        ))}
      </div>
      {isModalOpen && (
        <FoodModal
          item={selectedMenu}
          onClose={handleMenuClose}
          //모달에 App함수 넘겨줌
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default FoodBoard;
