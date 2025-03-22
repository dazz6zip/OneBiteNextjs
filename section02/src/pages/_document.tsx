import { Html, Head, Main, NextScript } from "next/document";

// 모든 페이지에 적용되어야 하는 HTML 코드
// 기존 React의 index.html 와 비슷한 역할
export default function Document() {
  return (
    <Html lang="kr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
