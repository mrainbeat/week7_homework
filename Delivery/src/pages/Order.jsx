import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';

const Order = () => {
  return (
    <div>
      <Navbar
        left={
          <div className="flex gap-[48px] items-center">
            <img src={Leftarrow} alt="왼쪽화실표" />
            <span className="text-[36px] font-bold">장바구니</span>
          </div>
        }
      />
    </div>
  );
};

export default Order;
