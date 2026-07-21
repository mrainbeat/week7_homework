# 👾 7주차 과제 - Delivery (배달 주문 웹 애플리케이션)

피그마 시안의 디자인을 충실히 반영하고, 프론트엔드와 백엔드(REST API) 연동을 통해 실제 배달 앱의 주문 흐름을 구현한 리액트 기반 웹 애플리케이션입니다. 사용자는 회원가입 및 카카오 로그인을 통해 서비스를 이용할 수 있으며, 음식점 탐색, 장바구니 담기, 크레딧 충전 및 결제까지의 프로세스를 구현했습니다.

---

## 🚀 주요 기능

- **사용자 인증 (Auth)**
  - JWT 토큰 기반의 일반 회원가입/로그인 및 카카오 소셜 로그인 기능을 제공합니다.
  - Axios Interceptor를 활용해 Request Header에 Access Token을 자동 실어 보내며, 로그인 상태 가드(Guard) 및 로그아웃 프로세스를 안전하게 관리합니다.

- **음식점 및 메뉴 조회 (Store & Menu)**
  - 백엔드 API와 연동하여 카테고리별 가게 목록 및 메뉴 상세 데이터를 실시간으로 조회합니다.
  - **기타 카테고리 필터링:** 백엔드 카테고리에 속하지 않은 매장 목록을 프론트엔드 차원에서 자체 필터링 처리하여 화면에 올바르게 노출합니다.
  - Tailwind CSS 기반 반응형 레이아웃으로 식당 카드를 직관적으로 배치했습니다.

- **메뉴 선택 및 수량/옵션 조작 (Menu Modal)**
  - 단일/복수 선택 옵션 지원 및 선택에 따른 가격 실시간 합산 연산을 지원합니다.
  - **최종 확정 전송 UX:** 모달 내에서는 로컬 상태로 부드럽게 수량을 변경하고 [담기] 버튼 클릭 시 확정된 데이터를 단 1회 전송하도록 최적화했습니다.

- **장바구니 관리 (Cart & Order)**
  - 장바구니 내 메뉴 수량 조절 및 삭제 기능을 제공하며, 매장별로 메뉴 목록이 한눈에 보이도록 가공합니다.
  - **안정적인 UI 정렬 유지:** 수량 조절 시 배열의 순서가 널뛰는 현상을 방지하기 위해 가게 이름 및 메뉴 ID 기준의 정렬 로직을 적용했습니다.

- **결제 및 주문 (Order)**
  - 보유 크레딧 잔액 연산 및 부족 여부 실시간 검증 기능을 제공합니다.
  - 최종 결제 성공 시 잔액 자동 차감 및 로컬스토리지 최신화, 영수증 완료 페이지로 이동합니다.

---

## 🛠 기술 스택

- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM (v6)
- **Network:** Axios (Custom Instance & Interceptor)

---

## 📡 요약 API 명세서

| 도메인        | 기능 (API 이름)                   | HTTP Method | URL                             |
| :------------ | :-------------------------------- | :---------- | :------------------------------ |
| **회원/인증** | 회원가입                          | `POST`      | `/api/auth/signup`              |
|               | 로그인                            | `POST`      | `/api/auth/login`               |
|               | 내 정보 조회                      | `GET`       | `/api/users/me`                 |
| **가게/메뉴** | 전체 및 카테고리별 가게 목록 조회 | `GET`       | `/api/stores`                   |
|               | 가게 상세 및 메뉴 목록 조회       | `GET`       | `/api/stores/{storeId}`         |
| **장바구니**  | 장바구니 상품 및 옵션 담기        | `POST`      | `/api/carts/items`              |
|               | 내 장바구니 전체 목록 조회        | `GET`       | `/api/carts`                    |
|               | 장바구니 상품 수량 조절           | `PATCH`     | `/api/carts/items/{cartItemId}` |
|               | 장바구니 상품 삭제                | `DELETE`    | `/api/carts/items/{cartItemId}` |
| **결제/주문** | 크레딧 충전하기                   | `POST`      | `/api/credits/charge`           |
|               | 장바구니 결제 및 주문 완료        | `POST`      | `/api/orders`                   |

---

## 🎨 레이아웃 및 디자인 가이드

1. **로그인 / 회원가입 페이지**
   - 모바일 환경 대응을 위한 `box-sizing` 및 flex 크기 제한 리셋 적용.
   - 카카오 소셜 로그인 콜백 페이지(`KakaoCallback.jsx`) 구현으로 자연스러운 토큰 수령 및 리다이렉트 흐름 완성.

2. **장바구니 및 결제 페이지**
   - 데스크톱(`dt:`)과 모바일 환경을 구분하여 모바일 화면에서는 장바구니 / 결제하기 뷰 스위칭 버튼 UI 제공.
   - `totalPrice` 연산 시 옵션 가격 및 수량을 실시간 합산 반영.

---

## 📁 프로젝트 구조

```text
📦 DELIVERY
└── 📂 src
    ├── 📂 api
    │   └── 📜 axios.js
    ├── 📂 assets
    ├── 📂 components
    │   ├── ⚛️ KakaoLoginButton.jsx
    │   ├── 📂 Cart
    │   │   └── ⚛️ CartList.jsx
    │   ├── 📂 layouts
    │   │   ├── ⚛️ Layout.jsx
    │   │   └── ⚛️ Navbar.jsx
    │   └── 📂 main
    │       ├── ⚛️ FilterButton.jsx
    │       ├── ⚛️ FoodBoard.jsx
    │       ├── ⚛️ FoodCard.jsx
    │       ├── ⚛️ FoodModal.jsx
    │       ├── ⚛️ ModalList.jsx
    │       └── ⚛️ OptionList.jsx
    ├── 📂 mocks
    │   └── 📜 mock.js
    ├── 📂 pages
    │   ├── ⚛️ CompleteOrder.jsx
    │   ├── ⚛️ CreditCharge.jsx
    │   ├── ⚛️ KakaoCallback.jsx
    │   ├── ⚛️ Login.jsx
    │   ├── ⚛️ Menu.jsx
    │   ├── ⚛️ NotFound.jsx
    │   ├── ⚛️ Order.jsx
    │   └── ⚛️ Signup.jsx
    ├── 🎨 App.css
    ├── ⚛️ App.jsx
    ├── 🎨 index.css
    └── ⚛️ main.jsx
```

## 📝 커밋 컨벤션 (Commit Convention)

커밋 메시지는 **`[Type] : 작성 내용`** 형식으로 통일합니다.

- **`[Feat]`** : 새로운 기능 구현
- **`[Mod]`** : 코드 수정 및 내부 파일 수정
- **`[Add]`** : 부수적인 코드 추가 및 라이브러리 추가, 새로운 파일 생성
- **`[Fix]`** : 버그 및 오류 해결
- **`[Docs]`** : 문서화 작업 시
- **`[Refactor]`** : 코드 리팩터링 (전면 수정)
- **`[Chore]`** : 버전 코드 수정, 패키지 구조 변경, 타입 및 변수명 변경 등 경미한 수정
- **`[Rename]`** : 파일명 또는 폴더명 수정한 경우
- **`[Del]`** : 쓸모없는 코드나 파일 삭제
- **`[Environment]`** : 개발 환경 세팅 시
- **`[!HOTFIX]`** : 급하게 치명적인 버그를 고쳐야 하는 경우
