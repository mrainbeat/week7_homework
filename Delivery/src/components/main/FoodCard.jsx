const FoodCard = ({ StoreId, name, rating, category, imageUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="h-[260px] w-[280px] bg-white rounded-[20px] border border-gray-2 overflow-hidden hover:shadow-lg cursor-pointer"
    >
      <div className="w-full h-[182px]">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col h-[140px] px-[20px] pt-[12px] pb-[20px]">
        <h3 className="text-[24px] font-extrabold">{name}</h3>
        <div className="flex justify-between">
          <p className="text-[12px] text-gray-3 ">⭐️ {rating}</p>
          <p className="bg-green-assistive text-green-primary text-[12px] rounded px-1">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
