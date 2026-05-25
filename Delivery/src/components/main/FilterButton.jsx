const FilterButton = ({ category, active, onClick }) => {
  return (
    <div>
      {/*active가 활성화될 때, 즉 선택됐을 때마다 색이 달라지도록 설정(필터링기능은 FoodBoard에서 수행*/}
      <button
        onClick={onClick}
        className={`w-[71px] h-[39px] rounded text-[20px] py-[8px] px-[16px] cursor-pointer ${active ? 'bg-[#F9A0AD] text-white' : 'bg-[#FFFFFF] text-[#F9A0AD]'}`}
      >
        {category}
      </button>
    </div>
  );
};

export default FilterButton;
