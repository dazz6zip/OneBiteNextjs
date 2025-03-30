import styles from "./page.module.css";

// 폴더 이름을 소괄호로 묶으면 라우트 그룹이 됨
// 라우트 그룹은 경로에 어떠한 영향도 미치지 않음
// 라우트 그룹에 속한 경로만 layout 설정 가능

// app router 는 기본적으로 모두 server component (브라우저 x)
// 그렇기 때문에 useEffect 처럼 브라우저에서만 사용 가능한 react hook 실행 불가능
// 최상단에 "use client"; 문구 삽입하면 client component 로 설정됨
// 일단 server 측에서 한 번 실행된 다음에 브라우저에서 한 번 더 실행되는 것

// 상호작용이 필요한 component들은 client component 로 설정하면 됨
// 클릭시 이동 정도는 <a></a> 정도의 html 기능이기 때문에 server component 가능

export default function Home() {
  return <div className={styles.page}>인덱스 페이지</div>;
}
