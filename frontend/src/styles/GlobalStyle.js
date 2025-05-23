import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* 공통 리셋 */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.4;
    background-color:#001840;
    color: #fff;

    /* 모바일 기기에서 웹앱처럼 보이도록,
       스크롤 바운싱 등을 OS 기본에 맡길 수 있음.
       필요하다면 overscroll-behavior 등 추가 가능 */
    overscroll-behavior: none;
    -webkit-font-smoothing: antialiased;
  }
  
  /* 
    반응형을 위한 예시:
    - 모바일을 기준으로 스타일을 작성하고,
    - 더 큰 화면에서 폰트 사이즈 등을 조금씩 늘리는 식.
  */

  /* 작은 스마트폰(최대 약 360px 이하) */
  @media (max-width: 359px) {
    body {
      font-size: 14px;
    }
  }

  /* 일반적인 스마트폰 (가로 360px ~ 767px) */
  @media (min-width: 360px) and (max-width: 767px) {
    body {
      font-size: 16px;
    }
  }

  /* 태블릿 크기 (768px ~ 1023px) */
  @media (min-width: 768px) and (max-width: 1023px) {
    body {
      font-size: 17px;
    }
  }

  /* 데스크톱 (1024px 이상) */
  @media (min-width: 1024px) {
    body {
      font-size: 18px;
    }
  }
`;

export default GlobalStyle;