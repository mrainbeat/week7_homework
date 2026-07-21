import KakaoIcon from '../../assets/kakaotalk.png';

export const KakaoLoginButton = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleLogin = () => {
    window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
  };
  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full flex flex-row gap-4 justify-center py-2 items-center bg-[#FFE812] rounded-sm mt-6 hover:cursor-pointer"
    >
      <img src={KakaoIcon} alt="카카오 로그인" className="w-8 h-8" />
      <p className="text-black font-semibold ">카카오로 계속하기</p>
    </button>
  );
};
// KaKaoLoginButton.jsx

export default KakaoLoginButton;
