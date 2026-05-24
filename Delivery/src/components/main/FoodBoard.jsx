import FoodCard from './FoodCard';
import { StoreMockData } from '../../mocks/mock';
import { useState } from 'react';

const FoodBoard = () => {
  const [category, setCategory] = useState('전체');
  const categries = ['전체', '중식', '한식', '기타'];

  return (
    <div className="max-w-[1200px] min-h-[775px] pt-[201px] mx-[264px]">
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
