import FoodImg1 from '../assets/Food/Maratang.png';
import FoodImg2 from '../assets/Food/DooZim.png';
import FoodImg3 from '../assets/Food/Pooradak.png';
import FoodImg4 from '../assets/Food/tteokbokki.png';
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
        id: 'm1',
        name: '마라탕 1인분',
        detail: '마라탕 500g 기본 재료',
        price: 10000,
        isMultiple: false,
        side: [
          { name: '1단계', price: 0 },
          { name: '2단계', price: 0 },
          { name: '3단계', price: 0 },
          { name: '아주 맵게', price: 0 },
        ],
      },
      {
        id: 'm2',
        name: '꿔바로우',
        detail: '바삭 쫄깃 꿔바로우',
        price: 12000,
        isMultiple: false,
        side: [
          { name: '소', price: 0 },
          { name: '중(+4000)', price: 4000 },
          { name: '대(+10000)', price: 10000 },
        ],
      },
      {
        id: 'm3',
        name: '마라샹궈',
        detail: '떡볶이보단 마라샹궈',
        price: 20000,
        isMultiple: false,
        side: [
          { name: '소', price: 0 },
          { name: '중(+6000)', price: 6000 },
          { name: '대(+15000)', price: 15000 },
        ],
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
        id: 'm4',
        name: '두찜 까만찜닭',
        detail: '달콤 짭조름한 간장소스로 만든 까만찜닭',
        price: 27800,
        isMultiple: false,
        side: [
          { name: '뼈', price: 0 },
          { name: '순살 변경(+2000)', price: 2000 },
        ],
      },
      {
        id: 'm5',
        name: '[HOT] 두찜 실비한우곱찜닭',
        detail: '통통한 한우대창에 매운 김치 다대기가 뜸뿍',
        price: 34800,
        isMultiple: false,
        side: [
          { name: '보통맛', price: 0 },
          { name: '매운맛', price: 0 },
          { name: '아주 매운맛', price: 0 },
        ],
      },
      {
        id: 'm6',
        name: '[원조K로제] 두찜 로제찜닭',
        detail: 'K로제의 원조 두찜만의 특제소스',
        price: 30800,
        isMultiple: false,
        side: [
          { name: '뼈', price: 0 },
          { name: '순살 변경(+2000)', price: 2000 },
        ],
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
        id: 'm7',
        name: '[대표] 고추마요 치킨',
        detail: '고추마요 소스와 할라피뇨의 환상적인 조합',
        price: 24900,
        isMultiple: false,
        side: [
          { name: '뼈', price: 0 },
          { name: '순살 변경(+2000)', price: 2000 },
        ],
      },
      {
        id: 'm8',
        name: '씬 후라이드',
        detail: '가장 얇고 담백한 튀김옷의 후라이드',
        price: 22900,
        isMultiple: false,
        side: [
          { name: '뼈', price: 0 },
          { name: '순살 변경(+2000)', price: 2000 },
        ],
      },
      {
        id: 'm9',
        name: '블랙알리오',
        detail: '깊고 진한 간장과 담백한 마늘의 조화로 독보적인 맛',
        price: 24900,
        isMultiple: false,
        side: [
          { name: '뼈', price: 0 },
          { name: '순살 변경(+2000)', price: 2000 },
        ],
      },
    ],
  },
  {
    id: 4,
    name: '냠냠 분식',
    star: 4.8,
    type: '분식',
    image: FoodImg4,
    menus: [
      {
        id: 'm10',
        name: '떡볶이',
        detail: '매콤달콤 밀떡볶이',
        price: 12000,
        isMultiple: false,
        side: [
          { name: '안 맵게', price: 0 },
          { name: '덜 맵게', price: 0 },
          { name: '맵게', price: 0 },
          { name: '아주 맵게', price: 0 },
        ],
      },
      {
        id: 'm11',
        name: '튀김',
        detail: '바삭바삭 모듬 튀김',
        price: 12000,
        isMultiple: true,
        side: [
          { name: '새우 튀김(+300)', price: 300 },
          { name: '고구마 튀김(+400)', price: 400 },
          { name: '고추 튀김(+500)', price: 500 },
        ],
      },
      {
        id: 'm12',
        name: '어묵',
        detail: '따끈한 국물 어묵',
        price: 12000,
        isMultiple: false,
        side: [
          { name: '어묵 추가(+100)', price: 100 },
          { name: '어묵 추가 X', price: 0 },
        ],
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
        isMultiple: false,
        side: [
          { name: '와사비 포함', price: 0 },
          { name: '와사비 따로', price: 0 },
          { name: '와사비 빼기', price: 0 },
        ],
      },
      {
        id: 'm14',
        name: '연어+광어 반반 초밥 (10p)',
        detail: '가장 사랑받는 두 가지 네타를 한 번에 즐기는 메뉴',
        price: 19500,
        isMultiple: false,
        side: [
          { name: '와사비 포함', price: 0 },
          { name: '와사비 따로', price: 0 },
          { name: '와사비 빼기', price: 0 },
        ],
      },
      {
        id: 'm15',
        name: '바삭 모둠 튀김',
        detail: '깨끗한 기름에 튀겨내어 겉바속촉의 정석을 보여주는 튀김',
        price: 8000,
        isMultiple: false,
        side: [
          { name: '기본', price: 0 },
          { name: '새우튀김 2p 추가(+3000)', price: 3000 },
        ],
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
        isMultiple: false,
        side: [
          { name: '기본', price: 0 },
          { name: '면 추가(+1500)', price: 1500 },
        ],
      },
      {
        id: 'm17',
        name: '쉬림프 알리오올리오',
        detail: '올리브오일에 풍부한 마늘 향과 통통한 새우를 볶아낸 요리',
        price: 14000,
        isMultiple: false,
        side: [
          { name: '기본', price: 0 },
          { name: '면 추가(+1500)', price: 1500 },
        ],
      },
      {
        id: 'm18',
        name: '고르곤졸라 피자',
        detail: '진한 치즈 향 가득한 도우를 달콤한 꿀에 찍어 먹는 피자',
        price: 15000,
        isMultiple: false,
        side: [
          { name: 'M 사이즈', price: 0 },
          { name: 'L 사이즈(+3000)', price: 3000 },
        ],
      },
    ],
  },
  {
    id: 7,
    name: '장충동 왕족발',
    star: 4.7,
    type: '한식',
    image: FoodImg7,
    menus: [
      {
        id: 'm19',
        name: '한방 족발 (소)',
        detail: '몸에 좋은 한약재와 함께 푹 삶아내어 잡내 없이 부드러운 족발',
        price: 29000,
        isMultiple: false,
        side: [
          { name: '소', price: 0 },
          { name: '중(+5000)', price: 5000 },
          { name: '대(+10000)', price: 10000 },
        ],
      },
      {
        id: 'm20',
        name: '매콤 직화 불족발',
        detail: '화끈한 불맛 소스를 발라 직화로 구워낸 중독성 강한 매운맛',
        price: 32000,
        isMultiple: false,
        side: [
          { name: '덜 맵게', price: 0 },
          { name: '기본 맵게', price: 0 },
          { name: '아주 맵게', price: 0 },
        ],
      },
      {
        id: 'm21',
        name: '쟁반 막국수',
        detail: '새콤달콤한 특제 양념장에 신선한 야채를 듬뿍 비벼 먹는 국수',
        price: 8000,
        isMultiple: false,
        side: [
          { name: '기본', price: 0 },
          { name: '곱빼기(+2000)', price: 2000 },
        ],
      },
    ],
  },
  {
    id: 8,
    name: '월미당',
    star: 4.4,
    type: '아시안',
    image: FoodImg8,
    menus: [
      {
        id: 'm22',
        name: '소고기 쌀국수',
        detail: '깊고 진하게 우려낸 육수에 부드러운 차돌양지를 올린 쌀국수',
        price: 10500,
        isMultiple: false,
        side: [
          { name: '고수 X', price: 0 },
          { name: '고수 O (따로 제공)', price: 0 },
          { name: '고기 추가(+3000)', price: 3000 },
        ],
      },
      {
        id: 'm23',
        name: '팟타이 꿍 (새우 볶음면)',
        detail:
          '달콤 짭조름한 소스에 아삭한 숙주와 새우를 볶아낸 태국 대표 요리',
        price: 12000,
        isMultiple: false,
        side: [
          { name: '기본', price: 0 },
          { name: '면 추가(+2000)', price: 2000 },
        ],
      },
      {
        id: 'm24',
        name: '뿌빳퐁커리 (소)',
        detail: '바삭하게 튀긴 소프트쉘 크랩에 부드러운 커리 소스를 얹은 요리',
        price: 24000,
        isMultiple: false,
        side: [
          { name: '소', price: 0 },
          { name: '중(+8000)', price: 8000 },
          { name: '대(+15000)', price: 15000 },
        ],
      },
    ],
  },
];
