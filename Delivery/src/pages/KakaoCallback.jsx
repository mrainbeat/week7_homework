import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); //주소창의 값들을 읽어온다

  //화면이 처음 켜질 때 한 번 실행됨
  useEffect(() => {
    //유저가 카카오 로그인을 마치면 -> 카카오가 우리 사이트로 돌려보내면서 인가코드를 붙여서 보냄 -> 인가코드만 뽑아내기
    const code = useSearchParams.get('code');
    if (code) {
      //받은 코드를 백한테 보냄(기본 로그인과 다른점) -> 코드를 토큰과 바꿔와야됨
      sendCodeToBackend(code);
    }
  }, [searchParams]);

  //뽑아낸 코드를 백엔드 서버로 보내서 토큰 받아오기
  const sendCodeToBackend = async (code) => {
    try {
      const response = await api.post('api/auth/kakao', {
        code: code,
      });

      const data = response.data;
      console.log('백엔드에서 받아온 토큰 데이터 : ', data);

      //토큰과 로그인 여부를 로컬에 저장하기
      const token =
        response.data.accessToken || response.data.data?.accessToken;

      if (token) {
        // 로컬에 accessToken 및 로그인 여부 저장
        localStorage.setItem('accessToken', token);
        localStorage.setItem('isLoggedIn', 'true');
      }

      navigate('/', { replace: true });
    } catch (error) {
      console.error('카카오 로그인 중 백엔드와 통신 에러 : ', error);
    }
  };

  return (
    <div className="w-full h-screen felx items-center justify-center">
      <p className="text-lg font-medium text-gray-300">카카오 로그인 처리중</p>
    </div>
  );
};

export default KakaoCallback;
