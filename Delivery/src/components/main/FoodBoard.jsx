import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard';
import { StoreMockData } from '../../mocks/mock';
import api from '../../api/axios';
import FilterButton from './FilterButton';
import FoodModal from './FoodModal';
import Background from '../../assets/Background/background.png';

const FoodBoard = ({ addToCart, cart }) => {
  const [category, setCategory] = useState('전체');
  const categories = ['전체', '중식', '한식', '기타'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const url =
          category === '전체'
            ? '/api/stores'
            : `/api/stores?category=${category}`;
        const response = await api.get(url);
        setStoreList(response.data.data);
      } catch (error) {
        console.error('❌ 가게 목록 불러오기 실패:', error);
      }
    };
    fetchStores();
  }, [category]);

  const handleMenuClick = async (store) => {
    try {
      const response = await api.get(`/api/stores/${store.storeId}`);
      setSelectedMenu(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('❌ 가게 상세 정보 불러오기 실패:', error);
    }
  };

  const handleMenuClose = () => {
    setSelectedMenu(null);
    setIsModalOpen(false);
  };

  /*const handleServerAddToCart = async (menuItemInfo) => {
    const token = localStorage.getItem('accessToken');
    const memberId = localStorage.getItem('memberId') || '1';

    console.log('📥 [장바구니 담기 요청 원본 데이터]:', menuItemInfo);

    try {
      // 1. 메뉴 ID 추출
      const extractedMenuId =
        menuItemInfo.menuId ??
        menuItemInfo.originalID ??
        menuItemInfo.originalId ??
        menuItemInfo.cartItemId ??
        menuItemInfo.id;

      const menuId = Number(extractedMenuId);
      const quantity = Number(menuItemInfo.quantity || 1);

      // 2. 옵션 ID 배열 아주 강력하게 추출 (모달 데이터가 어떤 형태든 다 잡아냄)
      let menuOptionIds = [];
      const rawOptions =
        menuItemInfo.selectedOptions ??
        menuItemInfo.options ??
        menuItemInfo.selectedOption ??
        [];

      if (Array.isArray(rawOptions)) {
        menuOptionIds = rawOptions
          .map((opt) => {
            // 옵션 객체 안에 들어있을 법한 모든 ID 변수명 스캔
            const opId =
              opt.menuOptionId ??
              opt.optionId ??
              opt.id ??
              opt.originalID ??
              opt;
            return opId !== undefined && opId !== null ? Number(opId) : null;
          })
          .filter((id) => id !== null && !isNaN(id));
      }

      console.log('🚀 [백엔드 전송 데이터]:', {
        menuId,
        quantity,
        menuOptionIds,
      });

      if (!extractedMenuId || isNaN(menuId)) {
        alert('메뉴 ID 정보를 찾을 수 없습니다.');
        return;
      }

      const response = await api.post(
        '/api/carts/items',
        {
          menuId: menuId,
          quantity: quantity,
          menuOptionIds: menuOptionIds,
        },
        {
          headers: {
            'Member-Id': String(memberId),
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 201 ||
        response.data?.status === 201 ||
        response.status === 200
      ) {
        // 🌟 요청하신 부분: 모달 닫기(handleMenuClose)를 없애서 화면을 계속 유지합니다!
        alert('장바구니에 메뉴가 성공적으로 담겼습니다!');
      }
    } catch (error) {
      console.error('❌ 장바구니 추가 실패:', error);
      alert(error.response?.data?.message || '장바구니 담기에 실패했습니다.');
    }
  };*/

  return (
    <div className="w-full max-w-[280px] min-h-[590px] pt-[135px] dt:max-w-[1200px] dt:w-[90%] dt:pb-[300px] dt:pt-[170px] mx-auto">
      <div className="flex gap-[24px] mb-[72px] text-white items-center overflow-x-auto">
        {categories.map((item) => (
          <FilterButton
            key={item}
            category={item}
            active={category === item}
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
            addToCart={addToCart}
          />
        </div>
      )}
    </div>
  );
};

export default FoodBoard;
