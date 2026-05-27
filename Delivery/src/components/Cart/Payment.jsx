const Payment = ({ onClick, paymentMethod, id }) => {
  const isActive = paymentMethod === id;
  return (
    <div>
      <button
        onClick={onClick}
        className={`w-[220px] h-[48px] py-[12px] px-[24px] rounded-[16px] text-[20px] cursor-pointer border ${
          isActive
            ? `bg-[#FFDFE3] text-[#F0485F] border-[#F0485F]`
            : `bg-[#F7F7F7] text-black border-transparent`
        }`}
      >
        {id}
      </button>
    </div>
  );
};

export default Payment;
