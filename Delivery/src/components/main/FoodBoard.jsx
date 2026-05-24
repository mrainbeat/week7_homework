import FoodCard from './FoodCard';
import { StoreMockData } from '../../mocks/mock';

const FoodBoard = () => {
  return (
    <div className="w-[1200px] h-[775px] px-[264px] pb-[173px] pt-[169px]">
      <div>
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
