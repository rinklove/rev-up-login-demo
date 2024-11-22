import React, { useState } from 'react';
import './main-div.css';

const MainDiv = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  // 로그인 요청을 보낼 함수
  const handleLogin = (provider) => {
    try {
      // 현재 페이지의 URL을 가져와서 redirect_uri로 사용
      const currentUrl = window.location.href || process.env.PUBLIC_URL;
      
      // 로그인 URL을 생성합니다.
      const loginUrl = `http://localhost:8080/oauth2/authorization/${provider}?redirect_uri=${currentUrl}`;
      
      // 해당 URL로 리다이렉트하여 소셜 로그인 페이지로 이동합니다.
      window.location.href = loginUrl;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main-div-container">
      <h1>OAuth 로그인</h1>
      
      {/* Google Login 버튼 */}
      <button className="login-button" onClick={() => handleLogin('google')}>Google Login</button>
      
      {/* Github Login 버튼 */}
      <button className="login-button" onClick={() => handleLogin('github')}>Github Login</button>
      
      {/* Kakao Login 버튼 */}
      <button className="login-button" onClick={() => handleLogin('kakao')}>Kakao Login</button>

      {/* 로그인 후 토큰 정보 출력 */}
      {error && <p className="error-message">Error: {error}</p>}
      <div className="token-info">
        <p><strong>Access Token:</strong> {accessToken ? accessToken : 'No access token found'}</p>
        <p><strong>Refresh Token:</strong> {refreshToken ? refreshToken : 'No refresh token found'}</p>
      </div>
    </div>
  );
};

export default MainDiv;
