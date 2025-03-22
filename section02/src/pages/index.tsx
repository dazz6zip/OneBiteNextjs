import style from "./index.module.css";
// app 을 제외한 다른 곳에 global css import 불가능

export default function Home() {
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  );
}
