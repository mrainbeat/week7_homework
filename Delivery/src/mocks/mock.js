import FoodImg1 from '../assets/Food/Maratang.png';
import FoodImg2 from '../assets/Food/DooZim.png';
import FoodImg3 from '../assets/Food/Pooradak.png';
import FoodImg4 from '../assets/Food/Gobdoritang.png';
import FoodImg5 from '../assets/Food/Sushi.png';
import FoodImg6 from '../assets/Food/Pasta.png';
import FoodImg7 from '../assets/Food/Jokbal.png';
import FoodImg8 from '../assets/Food/RiceNoodle.png';

export const StoreMockData = [
  {
    id: 1,
    name: '왕사부 마라탕',
    star: 4.5,
    type: '중식',
    image: FoodImg1,
    menus: [
      {
        id: 'm1', // 따옴표 추가
        name: '마라탕 1인분',
        detail: '마라탕 500g 기본 재료',
        price: 10000,
      },
      {
        id: 'm2', // 따옴표 추가
        name: '꿔바로우(소)',
        detail: '바삭 쫄깃 꿔바로우(7조각)',
        price: 12000,
      },
      {
        id: 'm3', // 따옴표 추가
        name: '마라샹궈(소)',
        detail: '떡볶이보단 마라샹궈',
        price: 20000,
      },
    ],
  },
  {
    id: 2,
    name: '두찜',
    star: 4.3,
    type: '한식',
    image: FoodImg2,
    menus: [
      {
        id: 'm4', // 따옴표 추가
        name: '두찜 까만찜닭',
        detail: '달콤 짭조름한 간장소스로 만든 까만찜닭',
        price: 27800,
      },
      {
        id: 'm5', // 따옴표 추가
        name: '[HOT] 두찜 실비한우곱찜닭', // 끝에 있는 ] 오타 제거
        detail: '통통한 한우대창에 매운 김치 다대기가 뜸뿍',
        price: 34800,
      },
      {
        id: 'm6', // 따옴표 추가
        name: '[원조K로제] 두찜 로제찜닭',
        detail: 'K로제의 원조 두찜만의 특제소스',
        price: 30800,
      },
    ],
  },
  {
    id: 3,
    name: '푸라닭',
    star: 4.1,
    type: '치킨',
    image: FoodImg3,
    menus: [
      {
        id: 'm7', // 따옴표 추가
        name: '[대표] 고추마요 치킨',
        detail: '고추마요 소스와 할라피뇨의 환상적인 조합',
        price: 24900,
      },
      {
        id: 'm8', // 따옴표 추가
        name: '씬 후라이드',
        detail: '가장 얇고 담백한 튀김옷의 후라이드',
        price: 22900,
      },
      {
        id: 'm9', // 따옴표 추가
        name: '블랙알리오',
        detail: '깊고 진한 간장과 담백한 마늘의 조화로 독보적인 맛',
        price: 24900,
      },
    ],
  },
  {
    id: 4,
    name: '윤반장 곱도리탕',
    star: 3.8,
    type: '한식',
    image: FoodImg4,
    menus: [
      {
        id: 'm10',
        name: '한우대창 곱도리탕(중)',
        detail: '신선한 한우 대창과 닭볶음탕의 환상 조합',
        price: 28900,
      },
      {
        id: 'm11',
        name: '소곱창 곱도리탕(중)',
        detail: '고소한 소곱창이 가득 들어간 인기 메뉴',
        price: 28900,
      },
      {
        id: 'm12',
        name: '[고기듬뿍] 닭볶음탕(중)',
        detail: '부드러운 닭고기가 아낌없이 들어간 밥도둑',
        price: 23500,
      },
    ],
  },
  {
    id: 5,
    name: '정희옥스시',
    star: 4.7,
    type: '일식',
    image: FoodImg5,
    menus: [
      {
        id: 'm13',
        name: '특선 초밥 세트 (12p)',
        detail: '당일 엄선한 활어와 생연어로 구성된 알찬 세트',
        price: 18000,
      },
      {
        id: 'm14',
        name: '연어+광어 반반 초밥 (10p)',
        detail: '가장 사랑받는 두 가지 네타를 한 번에 즐기는 메뉴',
        price: 19500,
      },
      {
        id: 'm15',
        name: '바삭 모둠 튀김',
        detail: '깨끗한 기름에 튀겨내어 겉바속촉의 정석을 보여주는 튀김',
        price: 8000,
      },
    ],
  },
  {
    id: 6,
    name: '롤링파스타',
    star: 4.3,
    type: '양식',
    image: FoodImg6,
    menus: [
      {
        id: 'm16',
        name: '매콤 까르보나라',
        detail: '꾸덕한 크림소스에 매콤함을 더해 느끼할 틈 없는 파스타',
        price: 13500,
      },
      {
        id: 'm17',
        name: '쉬림프 알리오올리오',
        detail: '올리브오일에 풍부한 마늘 향과 통통한 새우를 볶아낸 요리',
        price: 14000,
      },
      {
        id: 'm18',
        name: '고르곤졸라 피자',
        detail: '진한 치즈 향 가득한 도우를 달콤한 꿀에 찍어 먹는 피자',
        price: 15000,
      },
    ],
  },
  {
    id: 7,
    name: '장충동 왕족발',
    star: 4.7,
    type: '한식',
    image: FoodImg7, // FoodImg5 -> FoodImg7로 변경
    menus: [
      {
        id: 'm19',
        name: '한방 족발 (소)', // 보쌈 -> 족발로 자연스럽게 변경
        detail: '몸에 좋은 한약재와 함께 푹 삶아내어 잡내 없이 부드러운 족발',
        price: 29000,
      },
      {
        id: 'm20',
        name: '매콤 직화 불족발',
        detail: '화끈한 불맛 소스를 발라 직화로 구워낸 중독성 강한 매운맛',
        price: 32000,
      },
      {
        id: 'm21',
        name: '쟁반 막국수',
        detail: '새콤달콤한 특제 양념장에 신선한 야채를 듬뿍 비벼 먹는 국수',
        price: 8000,
      },
    ],
  },
  {
    id: 8,
    name: '월미당',
    star: 4.4,
    type: '아시안',
    image: FoodImg8, // FoodImg6 -> FoodImg8로 변경
    menus: [
      {
        id: 'm22',
        name: '소고기 쌀국수',
        detail: '깊고 진하게 우려낸 육수에 부드러운 차돌양지를 올린 쌀국수',
        price: 10500,
      },
      {
        id: 'm23',
        name: '팟타이 꿍 (새우 볶음면)',
        detail:
          '달콤 짭조름한 소스에 아삭한 숙주와 새우를 볶아낸 태국 대표 요리',
        price: 12000,
      },
      {
        id: 'm24',
        name: '뿌빳퐁커리 (소)',
        detail: '바삭하게 튀긴 소프트쉘 크랩에 부드러운 커리 소스를 얹은 요리',
        price: 24000,
      },
    ],
  },
];
