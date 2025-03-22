import "@/styles/globals.css";
import type { AppProps } from "next/app";

// React의 App 과 동일
// 모든 페이지 역할을 하는 Component 들의 root(부모) Component
export default function App({ Component, pageProps }: AppProps) {
  // Component : 페이지 역할
  // pageProps : 페이지에 전달될 Props 를 객체 형태로
  return (
    <>
      <header>글로벌 헤더</header>
      <Component {...pageProps} />
    </>
  );
}
