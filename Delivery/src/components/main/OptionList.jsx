import { useState } from 'react';

const OptionList = ({ name, price, isSelected, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
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

export default OptionList;
