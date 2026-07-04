import { useState } from 'react';

const SideList = ({ name, price }) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div>
      <button
        onClick={handleSelect}
        className={`w-full rounded px-[8px] pt-[4px] pb-[3px] cursor-pointer
        ${
          isSelected
            ? 'border bg-[#FFDFE3] text-[#F0485F] border'
            : 'border bg-[#F7F7F7] text-[#F0485F] border-white'
        }`}
      >
        {name}
      </button>
    </div>
  );
};

export default SideList;
