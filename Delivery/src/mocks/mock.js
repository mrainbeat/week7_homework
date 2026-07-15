// import FoodImg1 from '../assets/Food/Maratang.png';
// import FoodImg2 from '../assets/Food/DooZim.png';
// import FoodImg3 from '../assets/Food/Pooradak.png';
// import FoodImg4 from '../assets/Food/tteokbokki.png';
// import FoodImg5 from '../assets/Food/Sushi.png';
// import FoodImg6 from '../assets/Food/Pasta.png';
// import FoodImg7 from '../assets/Food/Jokbal.png';
// import FoodImg8 from '../assets/Food/RiceNoodle.png';

// export const StoreMockData = [
//   {
//     storeId: 1,
//     name: '왕사부 마라탕',
//     rating: 4.5,
//     category: '중식',
//     imageUrl: FoodImg1,
//     menus: [
//       {
//         menuId: 'm1',
//         name: '마라탕 1인분',
//         description: '마라탕 500g 기본 재료',
//         price: 10000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's1_m1_o1', name: '1단계', additionalPrice: 0 },
//           { menuOptionId: 's1_m1_o2', name: '2단계', additionalPrice: 0 },
//           { menuOptionId: 's1_m1_o3', name: '3단계', additionalPrice: 0 },
//           { menuOptionId: 's1_m1_o4', name: '아주 맵게', additionalPrice: 0 },
//         ],
//       },
//       {
//         menuId: 'm2',
//         name: '꿔바로우',
//         description: '바삭 쫄깃 꿔바로우',
//         price: 12000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's1_m2_o1', name: '소', additionalPrice: 0 },
//           {
//             menuOptionId: 's1_m2_o2',
//             name: '중(+4000)',
//             additionalPrice: 4000,
//           },
//           {
//             menuOptionId: 's1_m2_o3',
//             name: '대(+10000)',
//             additionalPrice: 10000,
//           },
//         ],
//       },
//       {
//         menuId: 'm3',
//         name: '마라샹궈',
//         description: '떡볶이보단 마라샹궈',
//         price: 20000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's1_m3_o1', name: '소', additionalPrice: 0 },
//           {
//             menuOptionId: 's1_m3_o2',
//             name: '중(+6000)',
//             additionalPrice: 6000,
//           },
//           {
//             menuOptionId: 's1_m3_o3',
//             name: '대(+15000)',
//             additionalPrice: 15000,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     storeId: 2,
//     name: '두찜',
//     rating: 4.3,
//     category: '한식',
//     imageUrl: FoodImg2,
//     menus: [
//       {
//         menuId: 'm4',
//         name: '두찜 까만찜닭',
//         description: '달콤 짭조름한 간장소스로 만든 까만찜닭',
//         price: 27800,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's2_m4_o1', name: '뼈', additionalPrice: 0 },
//           {
//             menuOptionId: 's2_m4_o2',
//             name: '순살 변경(+2000)',
//             additionalPrice: 2000,
//           },
//         ],
//       },
//       {
//         menuId: 'm5',
//         name: '[HOT] 두찜 실비한우곱찜닭',
//         description: '통통한 한우대창에 매운 김치 다대기가 뜸뿍',
//         price: 34800,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's2_m5_o1', name: '보통맛', additionalPrice: 0 },
//           { menuOptionId: 's2_m5_o2', name: '매운맛', additionalPrice: 0 },
//           { menuOptionId: 's2_m5_o3', name: '아주 매운맛', additionalPrice: 0 },
//         ],
//       },
//       {
//         menuId: 'm6',
//         name: '[원조K로제] 두찜 로제찜닭',
//         description: 'K로제의 원조 두찜만의 특제소스',
//         price: 30800,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's2_m6_o1', name: '뼈', additionalPrice: 0 },
//           {
//             menuOptionId: 's2_m6_o2',
//             name: '순살 변경(+2000)',
//             additionalPrice: 2000,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     storeId: 3,
//     name: '푸라닭',
//     rating: 4.1,
//     category: '치킨',
//     imageUrl: FoodImg3,
//     menus: [
//       {
//         menuId: 'm7',
//         name: '[대표] 고추마요 치킨',
//         description: '고추마요 소스와 할라피뇨의 환상적인 조합',
//         price: 24900,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's3_m7_o1', name: '뼈', additionalPrice: 0 },
//           {
//             menuOptionId: 's3_m7_o2',
//             name: '순살 변경(+2000)',
//             additionalPrice: 2000,
//           },
//         ],
//       },
//       {
//         menuId: 'm8',
//         name: '씬 후라이드',
//         description: '가장 얇고 담백한 튀김옷의 후라이드',
//         price: 22900,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's3_m8_o1', name: '뼈', additionalPrice: 0 },
//           {
//             menuOptionId: 's3_m8_o2',
//             name: '순살 변경(+2000)',
//             additionalPrice: 2000,
//           },
//         ],
//       },
//       {
//         menuId: 'm9',
//         name: '블랙알리오',
//         description: '깊고 진한 간장과 담백한 마늘의 조화로 독보적인 맛',
//         price: 24900,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's3_m9_o1', name: '뼈', additionalPrice: 0 },
//           {
//             menuOptionId: 's3_m9_o2',
//             name: '순살 변경(+2000)',
//             additionalPrice: 2000,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     storeId: 4,
//     name: '냠냠 분식',
//     rating: 4.8,
//     category: '분식',
//     imageUrl: FoodImg4,
//     menus: [
//       {
//         menuId: 'm10',
//         name: '떡볶이',
//         description: '매콤달콤 밀떡볶이',
//         price: 12000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's4_m10_o1', name: '안 맵게', additionalPrice: 0 },
//           { menuOptionId: 's4_m10_o2', name: '덜 맵게', additionalPrice: 0 },
//           { menuOptionId: 's4_m10_o3', name: '맵게', additionalPrice: 0 },
//           { menuOptionId: 's4_m10_o4', name: '아주 맵게', additionalPrice: 0 },
//         ],
//       },
//       {
//         menuId: 'm11',
//         name: '튀김',
//         description: '바삭바삭 모듬 튀김',
//         price: 12000,
//         isMultiple: true,
//         options: [
//           {
//             menuOptionId: 's4_m11_o1',
//             name: '새우 튀김(+300)',
//             additionalPrice: 300,
//           },
//           {
//             menuOptionId: 's4_m11_o2',
//             name: '고구마 튀김(+400)',
//             additionalPrice: 400,
//           },
//           {
//             menuOptionId: 's4_m11_o3',
//             name: '고추 튀김(+500)',
//             additionalPrice: 500,
//           },
//         ],
//       },
//       {
//         menuId: 'm12',
//         name: '어묵',
//         description: '따끈한 국물 어묵',
//         price: 12000,
//         isMultiple: false,
//         options: [
//           {
//             menuOptionId: 's4_m12_o1',
//             name: '어묵 추가(+100)',
//             additionalPrice: 100,
//           },
//           {
//             menuOptionId: 's4_m12_o2',
//             name: '어묵 추가 X',
//             additionalPrice: 0,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     storeId: 5,
//     name: '정희옥스시',
//     rating: 4.7,
//     category: '일식',
//     imageUrl: FoodImg5,
//     menus: [
//       {
//         menuId: 'm13',
//         name: '특선 초밥 세트 (12p)',
//         description: '당일 엄선한 활어와 생연어로 구성된 알찬 세트',
//         price: 18000,
//         isMultiple: false,
//         options: [
//           {
//             menuOptionId: 's5_m13_o1',
//             name: '와사비 포함',
//             additionalPrice: 0,
//           },
//           {
//             menuOptionId: 's5_m13_o2',
//             name: '와사비 따로',
//             additionalPrice: 0,
//           },
//           {
//             menuOptionId: 's5_m13_o3',
//             name: '와사비 빼기',
//             additionalPrice: 0,
//           },
//         ],
//       },
//       {
//         menuId: 'm14',
//         name: '연어+광어 반반 초밥 (10p)',
//         description: '가장 사랑받는 두 가지 네타를 한 번에 즐기는 메뉴',
//         price: 19500,
//         isMultiple: false,
//         options: [
//           {
//             menuOptionId: 's5_m14_o1',
//             name: '와사비 포함',
//             additionalPrice: 0,
//           },
//           {
//             menuOptionId: 's5_m14_o2',
//             name: '와사비 따로',
//             additionalPrice: 0,
//           },
//           {
//             menuOptionId: 's5_m14_o3',
//             name: '와사비 빼기',
//             additionalPrice: 0,
//           },
//         ],
//       },
//       {
//         menuId: 'm15',
//         name: '바삭 모둠 튀김',
//         description: '깨끗한 기름에 튀겨내어 겉바속촉의 정석을 보여주는 튀김',
//         price: 8000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's5_m15_o1', name: '기본', additionalPrice: 0 },
//           {
//             menuOptionId: 's5_m15_o2',
//             name: '새우튀김 2p 추가(+3000)',
//             additionalPrice: 3000,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     storeId: 6,
//     name: '롤링파스타',
//     rating: 4.3,
//     category: '양식',
//     imageUrl: FoodImg6,
//     menus: [
//       {
//         menuId: 'm16',
//         name: '매콤 까르보나라',
//         description: '꾸덕한 크림소스에 매콤함을 더해 느끼할 틈 없는 파스타',
//         price: 13500,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's6_m16_o1', name: '기본', additionalPrice: 0 },
//           {
//             menuOptionId: 's6_m16_o2',
//             name: '면 추가(+1500)',
//             additionalPrice: 1500,
//           },
//         ],
//       },
//       {
//         menuId: 'm17',
//         name: '쉬림프 알리오올리오',
//         description: '올리브오일에 풍부한 마늘 향과 통통한 새우를 볶아낸 요리',
//         price: 14000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's6_m17_o1', name: '기본', additionalPrice: 0 },
//           {
//             menuOptionId: 's6_m17_o2',
//             name: '면 추가(+1500)',
//             additionalPrice: 1500,
//           },
//         ],
//       },
//       {
//         menuId: 'm18',
//         name: '고르곤졸라 피자',
//         description: '진한 치즈 향 가득한 도우를 달콤한 꿀에 찍어 먹는 피자',
//         price: 15000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's6_m18_o1', name: 'M 사이즈', additionalPrice: 0 },
//           {
//             menuOptionId: 's6_m18_o2',
//             name: 'L 사이즈(+3000)',
//             additionalPrice: 3000,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     storeId: 7,
//     name: '장충동 왕족발',
//     rating: 4.7,
//     category: '한식',
//     imageUrl: FoodImg7,
//     menus: [
//       {
//         menuId: 'm19',
//         name: '한방 족발 (소)',
//         description:
//           '몸에 좋은 한약재와 함께 푹 삶아내어 잡내 없이 부드러운 족발',
//         price: 29000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's7_m19_o1', name: '소', additionalPrice: 0 },
//           {
//             menuOptionId: 's7_m19_o2',
//             name: '중(+5000)',
//             additionalPrice: 5000,
//           },
//           {
//             menuOptionId: 's7_m19_o3',
//             name: '대(+10000)',
//             additionalPrice: 10000,
//           },
//         ],
//       },
//       {
//         menuId: 'm20',
//         name: '매콤 직화 불족발',
//         description: '화끈한 불맛 소스를 발라 직화로 구워낸 중독성 강한 매운맛',
//         price: 32000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's7_m20_o1', name: '덜 맵게', additionalPrice: 0 },
//           { menuOptionId: 's7_m20_o2', name: '기본 맵게', additionalPrice: 0 },
//           { menuOptionId: 's7_m20_o3', name: '아주 맵게', additionalPrice: 0 },
//         ],
//       },
//       {
//         menuId: 'm21',
//         name: '쟁반 막국수',
//         description:
//           '새콤달콤한 특제 양념장에 신선한 야채를 듬뿍 비벼 먹는 국수',
//         price: 8000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's7_m21_o1', name: '기본', additionalPrice: 0 },
//           {
//             menuOptionId: 's7_m21_o2',
//             name: '곱빼기(+2000)',
//             additionalPrice: 2000,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     storeId: 8,
//     name: '월미당',
//     rating: 4.4,
//     category: '아시안',
//     imageUrl: FoodImg8,
//     menus: [
//       {
//         menuId: 'm22',
//         name: '소고기 쌀국수',
//         description:
//           '깊고 진하게 우려낸 육수에 부드러운 차돌양지를 올린 쌀국수',
//         price: 10500,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's8_m22_o1', name: '고수 X', additionalPrice: 0 },
//           {
//             menuOptionId: 's8_m22_o2',
//             name: '고수 O (따로 제공)',
//             additionalPrice: 0,
//           },
//           {
//             menuOptionId: 's8_m22_o3',
//             name: '고기 추가(+3000)',
//             additionalPrice: 3000,
//           },
//         ],
//       },
//       {
//         menuId: 'm23',
//         name: '팟타이 꿍 (새우 볶음면)',
//         description:
//           '달콤 짭조름한 소스에 아삭한 숙주와 새우를 볶아낸 태국 대표 요리',
//         price: 12000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's8_m23_o1', name: '기본', additionalPrice: 0 },
//           {
//             menuOptionId: 's8_m23_o2',
//             name: '면 추가(+2000)',
//             additionalPrice: 2000,
//           },
//         ],
//       },
//       {
//         menuId: 'm24',
//         name: '뿌빳퐁커리 (소)',
//         description:
//           '바삭하게 튀긴 소프트쉘 크랩에 부드러운 커리 소스를 얹은 요리',
//         price: 24000,
//         isMultiple: false,
//         options: [
//           { menuOptionId: 's8_m24_o1', name: '소', additionalPrice: 0 },
//           {
//             menuOptionId: 's8_m24_o2',
//             name: '중(+8000)',
//             additionalPrice: 8000,
//           },
//           {
//             menuOptionId: 's8_m24_o3',
//             name: '대(+15000)',
//             additionalPrice: 15000,
//           },
//         ],
//       },
//     ],
//   },
// ];
