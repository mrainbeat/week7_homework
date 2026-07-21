import KakaoIcon from '../assets/kakaotalk.png';

const KakaoLoginButton = () => {
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIREDCT_URI;
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

  //유저를 보낼 카카오 로그인 창 주소 조합하기
  //내 클라이언트 아이디(client_id) 확인 후 로그인이 끝나면 콜백 페이지로(redirect_uri) 인가코드(code)를 던져달라고 요청하기
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //유저가 카카오 로그인 버튼을 누르면 -> 브라우저 주소창 자체를 요청 주소창으로 이동시킴
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full flex flex-row gap-4 justify-center py-2 items-center bg-[#FFE812] rounded-[10px] h-[54px] cursor-pointer"
    >
      <img src={KakaoIcon} alt="카카오 로그인" className="w-6 h-6" />
      <p className="text-[#000000] font-bold text-[18px]">카카오로 계속하기</p>
    </button>
  );
};

export default KakaoLoginButton;
