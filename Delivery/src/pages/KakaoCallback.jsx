// KakaoCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 백엔드가 카카오 인증 성공 후 리다이렉트 시킬 때 URL에 실어준 토큰 추출
    // 백엔드 개발자분께 쿼리 파라미터 키값(token인지 accessToken인지) 물어보기!
    const token = searchParams.get('token') || searchParams.get('accessToken');

    if (token) {
      // Zustand 스토어 및 로컬 저장소에 저장
      setAccessToken(token);
      navigate('/', { replace: true });
    } else {
      // 만약 백엔드가 쿠키(Cookie) 방식으로 발급해 주는 구조라면
      // 별도 쿼리값 없이 바로 메인으로 이동시켜도 됨
      console.warn('URL에 토큰이 없거나 아직 전달받지 못했습니다.');
    }
  }, [searchParams, setAccessToken, navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center text-white text-2xl">
      <p className="text-lg font-medium text-gray-300">
        카카오 로그인 처리 중입니다...
      </p>
    </div>
  );
};

export default KakaoCallback;
