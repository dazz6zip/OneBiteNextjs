import styles from "./page.module.css";

// 폴더 이름을 소괄호로 묶으면 라우트 그룹이 됨
// 라우트 그룹은 경로에 어떠한 영향도 미치지 않음
// 라우트 그룹에 속한 경로만 layout 설정 가능

export default function Home() {
  return <div className={styles.page}>인덱스 페이지</div>;
}
