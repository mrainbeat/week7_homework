const FoodCard = ({ id, name, star, type, image }) => {
  return (
    <div>
      <img src={image} alt={name} />
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
