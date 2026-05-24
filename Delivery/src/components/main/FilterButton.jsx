const FilterButton = ({ category }) => {
  return (
    <div>
      <button className="w-[71px] h-[39px] bg-[#F9A0AD] rounded text-[20px] py-[8px] px-[16px]">
        {category}
      </button>
    </div>
  );
};

export default FilterButton;
