# 👾7주차 과제 - Delivery - 배달 주문 웹 애플리케이션

피그마 시안의 디자인을 반영하고, 로컬스토리지(localStorage)를 활용하여 상태 변화를 실시간으로 추적합니다.
사용자가 로그인 후 원하는 음식점을 클릭하면 상세 메뉴와 정보를 확인하고 주문 후 결제창까지 넘어가는 리액트 기반 웹 애플리케이션 입니다.


## 🚀 주요 기능

* **로그인/로그아웃/회원가입
    * 로그인과 로그아웃 및 회원가입을 하고 해당 계정에서 선택한 가게와 음식을 로컬 스토리지에 저장하여 장바구니 확인 가능
* **카테고리별 필터링 (Category Filtering)**
    *  카테고리 버튼을 클릭하면 해당하는 음식점 목록만 화면에 실시간으로 렌더링함
* **음식점 카드 UI (Food Card Components)**
    * Tailwind CSS를 활용하였고, 반응형인 그리드 레이아웃 시스템을 구축함
* **상세 정보 모달창 (Detail Modal Window)**
    * 특정 음식점 카드를 클릭하면 세부 메뉴가 있는 모달 창이 렌더링됨
    * 모달 내부에는 클릭한 음식점의 이름, 별점, 그리고 목데이터(Mock Data)로부터 매핑된 세부 메뉴 리스트가 출력됨
* **장바구니
    * 메뉴 페이지에서 선택했던 음식을 장바구니 페이지에서 확인 가능
    * 결제 수단 선택 및 총 가격 확인 가능

---

## 기술 스택

* 프레임워크: React (Vite)
* 스타일링: CSS3 (Vanilla CSS), TailwindCSS
* 라우팅: React Router DOM

## 레이아웃 및 디자인 가이드

피그마 시안에 명시된 단위를 레이아웃에 반영하였으며, 화면 해상도 변화에도 깨지지 않는 CSS 기법을 사용했습니다.

1. 로그인 / 회원가입 페이지
* 입력 칸(Input): 모바일 환경에서 부모 상자를 벗어나지 않도록 너비 리셋 및 box-sizing 설정 적용.
* 인터페이스: 독립적인 버튼 및 입력 칸 형태로 구현.

2. 장바구니 및 결제 페이지 (Order)
* 구조: 왼쪽 장바구니 상자는 배경색과 그림자 효과를 제거하여 전체 배경과 동화되는 형태로 구성하고, 오른쪽 결제 카드는 흰색 카드 레이아웃을 유지.
* 화면 배치: 브라우저 세로 공간을 동적으로 계산하여 네비게이션 바 하단 구역에서 상하좌우 정중앙에 위치하도록 구현.

## 핵심 로직 및 데이터 연동

1. 메뉴(Menu) 컴포넌트 및 로컬스토리지 연동
메뉴 페이지와 결제 페이지 간의 데이터 연동은 브라우저 공용 저장소인 localStorage를 매개체로 작동합니다.
* 컴포넌트 구조: FoodBoard, FoodCard, FoodModal, ModalList로 세분화하여 설계.
* 기능 구현: 모달 창에서 최종 선택한 메뉴와 수량을 로컬스토리지에 저장하는 함수를 구현했습니다.
* Key: cartItems
* Value Data Type: 객체 배열(Array)

```json
[
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
      },
      {
        id: 'm2',
        name: '꿔바로우(소)',
        detail: '바삭 쫄깃 꿔바로우(7조각)',
        price: 12000,
      },
      {
        id: 'm3',
        name: '마라샹궈(소)',
        detail: '떡볶이보단 마라샹궈',
        price: 20000,
      },
    ],
  },
]
```
---

## 📁 프로젝트 구조 
📦 DELIVERY
└── 📂 src
    ├── 📂 assets
    │   └── 🎨 plus.svg
    ├── 📂 components
    │   ├── 📂 layouts
    │   │   └── ⚛️ Layout.jsx
    │   ├── 📂 main
    │   │   ├── ⚛️ FilterButton.jsx
    │   │   ├── ⚛️ FoodBoard.jsx
    │   │   ├── ⚛️ FoodCard.jsx
    │   │   ├── ⚛️ FoodModal.jsx
    │   │   └── ⚛️ ModalList.jsx
    │   └── ⚛️ CartList.jsx
    ├── 📂 mocks
    │   └── 📜 mock.js
    ├── 📂 pages
    │   ├── 🎨 Login.css
    │   ├── ⚛️ Login.jsx
    │   ├── ⚛️ Menu.jsx
    │   ├── ⚛️ NotFound.jsx
    │   ├── 🎨 Order.css
    │   ├── ⚛️ Order.jsx
    │   ├── 🎨 Signup.css
    │   └── ⚛️ Signup.jsx
    ├── 📂 stores
    ├── 🎨 App.css
    ├── ⚛️ App.jsx
    ├── 🎨 index.css
    └── ⚛️ main.jsx

## 브랜치 전략
* **main
    * 기능 구현 및 테스트가 완료된 코드만 최종적으로 병합함
* **seoyoung
    * navb
    * menu
        * FoodBoard / FoodCard / FilterButton
        * FoodModal / ModalList
    * order
        *cartList
* **minjun
    * Login
    * Signup
    * Order
