import React, { useState, useEffect } from 'react';
import './main-div.css';

const MainDiv = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [error, setError] = useState(null);

  // 로그인 요청을 보낼 함수 (로컬 서버용)
  const handleLocalhostLogin = (provider) => {
    try {
      const currentUrl = window.location.href.split('?')[0];
      console.log(`redirect_uri = ${currentUrl}`);
      const loginUrl = `http://localhost:8080/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(currentUrl)}`;
      window.location.href = loginUrl;
    } catch (err) {
      setError(err.message);
    }
  };

  // 로그인 요청을 보낼 함수 (배포 서버용)
  const handleReleaseServerLogin = (provider) => {
    try {
      const currentUrl = window.location.href.split('?')[0];
      console.log(`redirect_uri = ${currentUrl}`);
      const loginUrl = `https://revuprevup.o-r.kr/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(currentUrl)}`;
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

  useEffect(() => {
    getTokensFromUrl();
  }, []);

  return (
    <div className="main-div-container">
      <h1>테스트용 OAuth 로그인</h1>
      
      <div>
        <button className="login-button" onClick={() => handleLocalhostLogin('google')}>localhost로 구글 로그인</button>
        <button className="login-button" onClick={() => handleLocalhostLogin('github')}>localhost로 깃허브 로그인</button>
        <button className="login-button" onClick={() => handleLocalhostLogin('kakao')}>localhost로 카카오 로그인</button>
      </div>

      <div>
        <button className="login-button" onClick={() => handleReleaseServerLogin('google')}>배포용 서버로 구글 로그인</button>
        <button className="login-button" onClick={() => handleReleaseServerLogin('github')}>배포용 서버로 깃허브 로그인</button>
        <button className="login-button" onClick={() => handleReleaseServerLogin('kakao')}>배포용 서버로 카카오 로그인</button>
      </div>

      {error && <p className="error-message">Error: {error}</p>}

      <div className="token-info">
        <div>
          <strong>Access Token</strong>
          <div>{accessToken ? accessToken : 'No access token found'}</div>
        </div>
        <div>
          <strong>Refresh Token</strong>
          <div>{refreshToken ? refreshToken : 'No refresh token found'}</div>
        </div>
      </div>
    </div>
  );
};


export default MainDiv;
