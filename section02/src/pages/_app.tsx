import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

// React의 App 과 동일
// 모든 페이지 역할을 하는 Component 들의 root(부모) Component
export default function App({ Component, pageProps }: AppProps) {
  // Component : 페이지 역할
  // pageProps : 페이지에 전달될 Props 를 객체 형태로

  const router = useRouter();

  const onClickButton = () => {
    router.push(`/test`);
    // router.replace() : 뒤로가기 방지 + 페이지 이동
    // router.back() : 뒤로가기
  };
  return (
    <>
      <header>
        <Link href={`/`}>index</Link>&nbsp;
        <Link href={`/search`}>search</Link>&nbsp;
        <Link href={`/book/1`}>book/1</Link>
        {/* HTML 의 a 태그는 이동할 때마다 새로운 HTML 로드
        -> Next.js 에서는 자체 제공하는 Link 이용 */}
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
          {/* 프로그래메틱한 페이지 이동 (특정 버튼 클릭 혹은 조건 만족시 함수 내에서 페이지 이동) */}
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
