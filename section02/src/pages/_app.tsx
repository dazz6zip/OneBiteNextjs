import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// 프리패칭 (pre-fetching)
// 현재 페이지에서 이동 가능한 모든 경로의 JS를 미리 가져옴 (Link, button...)

// 사전 렌더링 개념에서는 초기 접근이 완료되면 모든 Component 가 로드되어
// 추가적인 정보를 가져올 필요가 없는데 왜 프리페칭이라는 개념이 존재하느냐?
// -> Next.js 는 사전 렌더링 과정에서 '모든' JS를 전달하는 것이 아니라 요청 페이지에 대해서만 가져옴
// -> 사전 렌더링에서 모든 JS 를 가져올 경우 Hydration 및 TTI 지연
// -> 페이지 이동시에 '다시' 초기 접근의 과정을 거치는 것은 비효율적이므로 프리패칭 기능이 추가로 작동하는 것

// 프로그래메틱한 페이지 이동은 프리패칭이 이루어지지 않음
// Link을 제외한 페이지 이동도 프리패칭에 포함하고 싶을 경우 useEffect로 prefetch 지정

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps}></Component>
    </GlobalLayout>
  );
}
