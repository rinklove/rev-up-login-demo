import React, { useState, useEffect } from 'react';
import './main-div.css';
import { REACT_APP_API_BASE_URL_RELEASE } from '../../variables/server';

const ReleaseMainDiv = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = REACT_APP_API_BASE_URL_RELEASE;

  // 로그인 요청을 보낼 함수
  const handleLogin = (provider) => {
    try {
      // 현재 페이지의 URL에서 ? 이후 부분을 제거
      const currentUrl = window.location.href.split('?')[0];
      console.log(`redirect_uri = ${currentUrl}`);
      
      // 로그인 URL을 생성합니다.
      const loginUrl = `http://ec2-15-164-143-242.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(currentUrl)}`;
      
      // 해당 URL로 리다이렉트하여 소셜 로그인 페이지로 이동합니다.
      window.location.href = loginUrl;
    } catch (err) {
      setError(err.message);
    }
  };

  // URL에서 토큰을 추출하여 상태에 저장하는 함수
  const getTokensFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    const refresh = urlParams.get('refresh_token');

    if (token && refresh) {
      setAccessToken(token);
      setRefreshToken(refresh);
    } else {
      setError('No tokens found in the URL');
    }
  };

  // 컴포넌트가 마운트되었을 때 URL에서 토큰을 추출
  useEffect(() => {
    console.log('REACT_APP_API_BASE_URL_RELEASE:', API_BASE_URL);
    getTokensFromUrl();
  }, []); // 의존성 배열 비워두어 컴포넌트 마운트 시 한 번만 실행되도록 설정

  return (
    <div className="main-div-container">
      <h1>배포용 OAuth 로그인</h1>
      
      {/* Google Login 버튼 */}
      <button className="login-button" onClick={() => handleLogin('google')}>Google Login</button>
      
      {/* Github Login 버튼 */}
      <button className="login-button" onClick={() => handleLogin('github')}>Github Login</button>
      
      {/* Kakao Login 버튼 */}
      <button className="login-button" onClick={() => handleLogin('kakao')}>Kakao Login</button>

      {/* 로그인 후 토큰 정보 출력 */}
      {error && <p className="error-message">Error: {error}</p>}
      <div className="token-info">
        <div>
          <div><strong>Access Token</strong></div>
          <div>{accessToken ? accessToken : 'No access token found'}</div>
        </div>
        <div>
          <div><strong>Refresh Token:</strong></div>
          <div>{refreshToken ? refreshToken : 'No refresh token found'}</div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseMainDiv;
