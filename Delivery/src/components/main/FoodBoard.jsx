import FoodCard from './FoodCard';
import { StoreMockData } from '../../mocks/mock';
import { useState } from 'react';
import FilterButton from './FilterButton';

const FoodBoard = () => {
  const [category, setCategory] = useState('전체');
  const categories = ['전체', '중식', '한식', '기타'];

  // 각 아이템의 타입과 현재 카테고리 타입을 비교후 열치하는 타입만 필터링하기
  const filteredFoods =
    category === '전체'
      ? StoreMockData
      : StoreMockData.filter((food) => food.type === category);
  return (
    <div className="max-w-[1200px] min-h-[775px] pt-[201px] mx-[264px]">
      <div className="flex gap-[24px] mb-[72px] text-white items-center">
        {categories.map((item) => (
          <FilterButton key={item} category={item} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[24px] gap-y-8">
        {StoreMockData.map((item) => (
          <FoodCard
            key={item.id}
            name={item.name}
            star={item.star}
            type={item.type}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodBoard;
