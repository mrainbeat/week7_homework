const FoodCard = ({ id, name, star, type, image }) => {
  return (
    <div className="h-[322px] w-full">
      <img src={image} alt={name} className="w-full h-[182px] object-cover" />
      <div>
        <h3>{name}</h3>
        <p>⭐️{star}</p>
        <hr />
        <p>{type}</p>
      </div>
    </div>
  );
};

export default FoodCard;
