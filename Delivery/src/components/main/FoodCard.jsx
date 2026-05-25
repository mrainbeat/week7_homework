const FoodCard = ({ id, name, star, type, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="h-[322px] w-full bg-white rounded-lg overflow-hidden hover:shadow-lg cursor-pointer"
    >
      <div className="w-full h-[182px]">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col h-[140px] px-[8px] pt-[12px] pb-[20px]">
        <h3 className="text-[24px]">{name}</h3>
        <p className="text-[12px] text-[#858585] ">⭐️ {star}</p>
        <hr className="border-[#F9A0AD] my-[20px]" />
        <p className="text-[#F9A0AD] text-[14px]">{type}</p>
      </div>
    </div>
  );
};

export default FoodCard;
