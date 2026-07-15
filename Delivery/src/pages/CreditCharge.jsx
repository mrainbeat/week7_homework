<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // 💡 공통 axios 인스턴스 경로

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
=======
import React, { useEffect, useState } from 'react';
import Leftarrow from '../assets/fa-solid_arrow-left.svg';
import Navbar from '../components/layouts/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios'; // 💡 공통 axios 인스턴스 경로
>>>>>>> 66d85f10d6d6a513845947078e6484d134e9d02e

  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 빈칸 방지
    if (!id || !password) {
      alert('아이디(이메일)와 비밀번호를 모두 입력해주세요.');
=======
  // 로그인할 때 저장된 진짜 회원 고유 ID 가져오기
  const memberId = localStorage.getItem('memberId') || '1';

  // 로그인 여부 체크하기
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus === 'true');
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('myCart');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('memberId');
    localStorage.removeItem('myCredit'); // 로그아웃 시 크레딧 초기화
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (loginStatus !== 'true') {
      navigate('/Login', { replace: true });
    }
  }, [loginStatus, navigate]);

  // 💡 최초 진입 시 브라우저 로컬스토리지에 저장된 누적 잔액이 있으면 읽고, 없으면 기본값 5000C 세팅
  const [myCredit, setMyCredit] = useState(() => {
    const saved = localStorage.getItem('myCredit');
    return saved ? Number(saved) : 5000;
  });

  // 사용자가 선택한 충전 금액 상태
  const [chargeAmount, setChargeAmount] = useState(0);

  // [GET] 내 정보 조회 API (/api/users/me)
  useEffect(() => {
    const fetchUserCredit = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await api.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('📥 [내 정보 API 응답 전체 데이터]:', response.data);

        // 내 정보 API에서 크레딧 정보를 주지 않으므로, 에러를 내지 않고
        // 기존에 로컬스토리지에 보관해 두었던 안전한 보유 크레딧을 그대로 유지합니다.
        const saved = localStorage.getItem('myCredit');
        if (saved) {
          setMyCredit(Number(saved));
        }
      } catch (error) {
        console.error('❌ 보유 크레딧 조회 완전히 실패:', error);
        const saved = localStorage.getItem('myCredit');
        setMyCredit(saved ? Number(saved) : 5000);
      }
    };

    if (isLoggedIn) {
      fetchUserCredit();
    }
  }, [isLoggedIn]);

  // 금액 누적 함수
  const handleAddAmount = (amount) => {
    setChargeAmount((prev) => prev + amount);
  };

  // 선택 금액 초기화 함수
  const handleResetAmount = () => {
    setChargeAmount(0);
  };

  // 💡 [POST] 7번 크레딧 충전 요청 (/api/credits/charge)
  const handleChargeSubmit = async () => {
    if (chargeAmount <= 0) {
      alert('충전할 금액을 선택해 주세요.');
>>>>>>> 66d85f10d6d6a513845947078e6484d134e9d02e
      return;
    }

    try {
<<<<<<< HEAD
      // 💡 1. 로그인 시도 전에 브라우저에 남아있던 이전 계정의 찌꺼기 싹 청소하기 (철벽 방어)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('memberId');

      // 🌟 2. 백엔드 서버로 로그인 요청 쏘기
      const response = await api.post('/api/auth/login', {
        email: id, // 회원가입 명세에 맞춰 email로 전송
        password: password,
      });

      console.log('로그인 성공 응답 데이터 전체:', response.data);

      // 🌟 3. 백엔드가 준 진짜 출입증(토큰) 꺼내기
      const token =
        response.data.accessToken || response.data.data?.accessToken;

      // 🌟 4. 백엔드가 준 회원 고유 ID(memberId) 유연하게 매핑해서 꺼내기
      const dataContainer = response.data?.data || response.data;
      const serverMemberId =
        dataContainer?.memberId ?? dataContainer?.id ?? dataContainer?.userId;

      if (token) {
        // api.js가 꺼내 쓸 수 있도록 토큰 저장
        localStorage.setItem('accessToken', token);
        localStorage.setItem('isLoggedIn', 'true');

        // 🌟 5. 추출한 회원 ID를 로컬스토리지에 확실히 저장 (크레딧 화면에서 이 ID별로 서랍을 쪼갬)
        if (serverMemberId) {
          localStorage.setItem('memberId', String(serverMemberId));
          console.log(
            '✅ 로컬스토리지에 memberId 격리 저장 완료:',
            serverMemberId
          );
        } else {
          console.warn(
            '⚠️ 로그인 성공 응답에 회원 고유 ID(memberId/id) 필드가 보이지 않습니다.'
          );
          // 예비책으로 우선 '1' 대신 유니크하게 인식될 수 있는 임시 구분값 부여 가능
          localStorage.setItem('memberId', '1');
        }

        alert('로그인 성공');
        window.location.href = '/Menu';
      } else {
        alert('로그인에 실패했습니다. 토큰을 전달받지 못했습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert(
        error.response?.data?.message ||
          '아이디 또는 비밀번호가 올바르지 않습니다.'
      );
      setPassword(''); // 틀렸을 때 비밀번호 칸만 깔끔하게 비워주기
=======
      const token = localStorage.getItem('accessToken');

      // 명세서 규격에 맞춰 전송! (예: 3000)
      const response = await api.post(
        '/api/credits/charge',
        {
          amount: chargeAmount, // Request Body
        },
        {
          headers: {
            'Member-Id': memberId, // Header 1
            Authorization: `Bearer ${token}`, // Header 2 (보안 통과용)
          },
        }
      );

      // 충전 API 호출 성공 (200 OK)
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data?.status === 200
      ) {
        // 1. 우선 백엔드 응답에서 진짜 최신 잔액(currentCredit)이 들어오는지 체크
        const serverCurrentCredit = response.data?.data?.currentCredit;
        console.log(
          '🔥 [서버가 돌려준 충전 후 최종 잔액]:',
          serverCurrentCredit
        );

        let nextCredit = myCredit + chargeAmount; // 기본값은 프론트에서 계산한 합산값

        if (serverCurrentCredit !== undefined && serverCurrentCredit !== null) {
          // 서버 데이터가 정상적으로 들어오면 서버 데이터로 덮어쓰기!
          nextCredit = Number(serverCurrentCredit);
        }

        // 2. 화면 상태 및 로컬스토리지에 안전하게 실시간 보존
        setMyCredit(nextCredit);
        localStorage.setItem('myCredit', String(nextCredit));

        alert(
          `${chargeAmount.toLocaleString()} 크레딧이 성공적으로 충전되었습니다!`
        );
        setChargeAmount(0); // 선택금액 초기화
        navigate('/Order'); // 주문 페이지로 이동
      }
    } catch (error) {
      console.error('크레딧 충전 연동 실패:', error);
      alert('크레딧 충전 중 오류가 발생했습니다.');
>>>>>>> 66d85f10d6d6a513845947078e6484d134e9d02e
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9] px-4">
      {/* 메인 박스 */}
      <div className="relative w-full max-w-[625px] h-auto min-h-[845px] bg-white border-2 border-white rounded-[16px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] px-[20px] py-[40px] flex flex-col items-center">
        {/* 타이틀 로고 영역 */}
        <h1 className="text-[#f0485f] text-[36px] font-bold mt-[40px] mb-[64px] text-center">
          로그인하기
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full flex flex-col items-center gap-[24px]"
        >
          {/* 아이디 입력 영역 */}
          <div className="flex flex-col w-full max-w-[553px]">
            <label
              htmlFor="id-input"
              className="text-[20px] font-bold text-[#333333] mb-[8px] text-left"
=======
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar
        left={
          <div className="flex gap-[48px] items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cursor-pointer bg-transparent border-none p-0 flex items-center justify-center"
>>>>>>> 66d85f10d6d6a513845947078e6484d134e9d02e
            >
              아이디
            </label>
            <input
              id="id-input"
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full h-[63px] px-[16px] border border-[#e0e0e0] rounded-[4px] text-[20px] outline-none box-border focus:border-[#0099ff] transition-colors"
            />
          </div>
<<<<<<< HEAD

          {/* 비밀번호 입력 영역 */}
          <div className="flex flex-col w-full max-w-[553px]">
            <label
              htmlFor="password-input"
              className="text-[20px] font-bold text-[#333333] mb-[8px] text-left"
            >
              비밀번호
            </label>
            <input
              id="password-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[63px] px-[16px] border border-[#e0e0e0] rounded-[4px] text-[20px] outline-none box-border focus:border-[#0099ff] transition-colors"
            />
          </div>

          {/* 회원가입 링크 영역 */}
          <div className="flex items-center gap-[12px] mt-[16px] text-[16px] text-[#555555]">
            <span>계정이 없나요?</span>
            <span
              onClick={() => navigate('/signup')}
              className="text-red-primary font-bold cursor-pointer hover:underline transition-all"
            >
              회원가입 하기
            </span>
          </div>

          {/* 로그인 버튼 */}
=======
        }
        right={
          <div className="text-black flex flex-col pr-5 items-end">
            <Link to="/Order" className="dt:hidden cursor-pointer text-[20px]">
              장바구니
            </Link>
            <Link
              to="/CreditCharge"
              className="dt:hidden cursor-pointer text-[20px]"
            >
              크레딧 충전
            </Link>
            {isLoggedIn ? (
              <Link
                to="/Login"
                className="dt:hidden hover:text-black text-[20px] transition-colors"
                onClick={handleLogout}
              >
                로그아웃
              </Link>
            ) : (
              <Link
                to="/Login"
                className="dt:hidden hover:text-black text-[20px] transition-colors"
              >
                로그인
              </Link>
            )}
          </div>
        }
      />

      <div className="flex-1 flex items-center justify-center w-[1200px] h-[604px] mx-auto box-border max-xl:w-full max-xl:h-auto max-xl:p-[20px]">
        <div className="w-[568px] h-[604px] bg-white rounded-[32px] p-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-[#F8F9FA] flex flex-col box-border mx-auto max-xl:w-full max-xl:h-auto">
          <h2 className="text-[36px] font-black text-center text-[#111111] mb-[40px]">
            크레딧 충전하기
          </h2>

          <div className="flex justify-end h-[24px] mb-[12px]">
            {chargeAmount > 0 && (
              <button
                type="button"
                onClick={handleResetAmount}
                className="text-[14px] text-[#A0A0A0] hover:text-[#555555] transition-colors duration-200 cursor-pointer underline underline-offset-4"
              >
                초기화
              </button>
            )}
          </div>

          {/* 1. 금액 선택 버튼 */}
          <div className="grid grid-cols-2 dt:flex dt:flex-row gap-[12px] dt:justify-between mb-[36px]">
            {[1000, 3000, 5000, 10000].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleAddAmount(amount)}
                className="flex-1 py-[12px] text-[16px] font-bold rounded-[8px] border border-transparent bg-[#F8F9FA] text-[#555555] hover:bg-[#7BC4A4] hover:text-white transition-all duration-200 cursor-pointer text-center"
              >
                +{amount.toLocaleString()}C
              </button>
            ))}
          </div>

          {/* 2. 요약 정보 상자 */}
          <div className="w-full bg-[#F8F9FA] rounded-[12px] p-[24px] flex flex-col gap-[16px] box-border mb-[40px]">
            <div className="flex justify-between text-[16px] font-bold text-[#111111]">
              <span>보유 크레딧</span>
              <span>{myCredit.toLocaleString()}C</span>
            </div>

            <div className="flex justify-between text-[20px] font-bold text-[#F0485F]">
              <span>충전 후 크레딧</span>
              <span>{(myCredit + chargeAmount).toLocaleString()}C</span>
            </div>
          </div>

          {/* 3. 실시간 결제 금액 */}
          <div className="flex justify-between items-center mb-[40px]">
            <span className="text-[18px] font-bold text-[#111111]">
              결제금액
            </span>
            <span className="text-[22px] font-black text-[#111111]">
              {chargeAmount === 0 ? '0' : chargeAmount.toLocaleString()}원
            </span>
          </div>

          {/* 4. 충전 버튼 */}
>>>>>>> 66d85f10d6d6a513845947078e6484d134e9d02e
          <button
            type="submit"
            className="w-[244px] h-[54px] bg-[#f0f0f0] text-[#555555] border-none rounded-[20px] text-[20px] font-bold cursor-pointer mx-auto mt-[64px] transition-all duration-200 ease-in-out hover:bg-red-primary hover:text-white"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
