import { Link, useLocation } from 'react-router-dom';

const CompleteOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#F7F7F7]">
      <div className="flex flex-col items-center">
        <h1 className="text-[36px] font-extrabold mb-[36px] dt:mb-[6px]">
          주문 완료!
        </h1>
        <p className="text-[#858585] mb-[36px] dt:mb-[113px]">
          음식이 배달 됩니다...
        </p>
        <Link
          to="/Menu"
          className="bg-[#F0485F] px-[64px] py-[16px] rounded-xl"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
};

export default CompleteOrder;
