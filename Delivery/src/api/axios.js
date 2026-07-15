import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  //서버 주소
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//필요없는코드
//요청 : 백엔드로 출발하기 직전에 가로채기
api.interceptors.request.use(
  (config) => {
    //1. 로컬스토리지에서 accessToken 꺼낸다
    const token = localStorage.getItem('accessToken');
    //토큰이 있다면 -> 백엔드 요청(config) 헤더에 토큰을 넣어서 보냄
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    //config 전송
    return config;
  },
  //요청 실패시 에러
  (error) => {
    return Promise.reject(error);
  }
);

//응답 : 백엔드에서 답변 돌아왔을 때 가로채기
api.interceptors.response.use(
  //성공(200) > 통과
  (response) => {
    return response;
  },
  //실패 시 실행됨
  async (error) => {
    //보냈던 config 메시지(잘못됐던 것)
    const originalRequest = error.config;

    //에러코드 401 -> 토큰 만료 이고, config를 재전송한적이 없다면
    if (error.response?.status === 401 && !originalRequest._retry) {
      //재시도 후 재시도 흔적 남기기
      originalRequest._retry = true;

      try {
        //로컬에서 토큰 꺼내오기
        const refreshToken = localStorage.getItem('refreshToken');

        //토큰이 없다면 -> 로그인을 안했거나 만료됨 > 에러
        if (!refreshToken) {
          throw new Error('리프레쉬 토큰이 없습니다.');
        }

        //axios 를 써서 토큰을 재발급 받는다
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/auth/refresh`,
          {
            refreshToken: refreshToken,
          }
        );

        //백엔드가 새로운 토큰 발급
        const newAccessToken =
          refreshResponse.data.accessToken ||
          refreshResponse.data.data?.accessToken;

        //토큰을 발급 받았다면 로컬의 토큰을 새 토큰으로 교체 후. > Bearer로 헤더에 새 토큰을 넣음 > 다시 백엔드로 전송
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        //리프레쉬 토큰도 만료시 -> 에러 후 로그아웃 처리
        console.error('리프레쉬 토큰 만료', refreshError);

        localStorage.clear();
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }
    //다른 에러가 떴을 경우 -> 원래 났던 에러를 화면에 띄움
    return Promise.reject(error);
  }
);

export default api;
