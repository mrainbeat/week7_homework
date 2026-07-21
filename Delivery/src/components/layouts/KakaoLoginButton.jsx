// KakaoLoginButton.jsx
import KakaoIcon from '../../assets/kakaotalk.png'; // 상대 경로 프로젝트에 맞게 확인!

export const KakaoLoginButton = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL; // https://mutsa-food.shop
  const KAKAO_AUTH_URL = `${BASE_URL}/oauth2/authorization/kakao`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full flex flex-row gap-4 justify-center py-2 items-center bg-[#FFE812] rounded-sm mt-6 hover:cursor-pointer transition-opacity hover:opacity-90"
    >
      <img src={KakaoIcon} alt="카카오 로그인" className="w-8 h-8" />
      <p className="text-black font-semibold">카카오로 계속하기</p>
    </button>
  );
};

export default KakaoLoginButton;
