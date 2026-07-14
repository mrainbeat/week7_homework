import FoodCard from './FoodCard';
import { StoreMockData } from '../../mocks/mock';
import { useState, useEffect } from 'react';
import api from '../../api/axios'; //axios 추가
import FilterButton from './FilterButton';
import FoodModal from './FoodModal';
import Background from '../../assets/Background/background.png';

const FoodBoard = ({ addToCart, cart }) => {
  const [category, setCategory] = useState('전체');
  const categories = ['전체', '중식', '한식', '기타'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  //서버에서 받아온 전체 가게 목록을 저장하는 State
  const [storeList, setStoreList] = useState([]);

  //화면이 켜지거나 카테고리가 바뀔때마다 실행됨
  useEffect(() => {
    const fetchStores = async () => {
      try {
        //카테고리가 전체라면 기본, 아니라면 각 카테고리가 붙은 주소로 요청을 보낸다
        const url =
          category === '전체'
            ? '/api/stores'
            : `/api/stores?category=${category}`;

        const response = await api.get(url, {
          //요청시 필요한 번호
          headers: { 'Member-Id': 1 },
        });
        //받아온 데이터를 StoreList 에 넣음
        setStoreList(response.data.data);
      } catch (error) {
        console.error('가게 목록 불러오기 실패:', error);
      }
    };
    fetchStores();
  }, [category]); //카테고리가 마운트 될 때 마다 실행됨

  //FoodCard 클릭시 상세 메뉴 API를 호출한다
  const handleMenuClick = async (store) => {
    try {
      const response = await api.get(`/api/stores/${store.storeId}`, {
        //요청시 필요한 번호
        headers: { 'Member-Id': 1 },
      });

      setSelectedMenu(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('가게 상세 정보 불러오기 실패:', error);
    }
  };

  const handleMenuClose = () => {
    setSelectedMenu(null);
    setIsModalOpen(false);
  };

  // 각 아이템의 타입과 현재 카테고리 타입을 비교후 열치하는 타입만 필터링하기
  // 기타 선택 시 한/중식 외의 음식만 필터링하도록 만들기
  const filteredFoods = () => {
    if (category === '전체') {
      return StoreMockData;
    }
    if (category === '기타') {
      return StoreMockData.filter(
        (item) => item.type !== '한식' && item.type !== '중식'
      );
    }
    return StoreMockData.filter((item) => item.type === category);
  };

  return (
    <div className="w-full max-w-[280px] min-h-[590px] pt-[135px] dt:max-w-[1200px] dt:w-[90%] dt:pb-[300px] dt:pt-[170px] mx-auto">
      <div className="flex gap-[24px] mb-[72px] text-white items-center overflow-x-auto">
        {categories.map((item) => (
          <FilterButton
            key={item}
            category={item}
            active={category === item}
            // 현재 선택된 버튼인지 여부를 감지함, onclick시 category변수가 변경됨
            onClick={() => setCategory(item)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 dt:grid-cols-4 gap-x-[24px] gap-y-8 pb-10">
        {storeList?.map((item) => (
          <FoodCard
            key={item.storeId}
            name={item.name}
            rating={item.rating}
            category={item.category}
            imageUrl={item.imageUrl}
            //누르면 열리도록 ture로 만듦
            onClick={() => handleMenuClick(item)}
          />
        ))}
      </div>
      {isModalOpen && (
        <div
          style={{
            background: `white url(${Background}) center/cover no-repeat`,
          }}
          className="fixed inset-0 z-40 flex items-center justify-center"
        >
          <FoodModal
            item={selectedMenu}
            onClose={handleMenuClose}
            //모달에 App함수 넘겨줌
            addToCart={addToCart}
          />
        </div>
      )}
    </div>
  );
};

export default FoodBoard;
