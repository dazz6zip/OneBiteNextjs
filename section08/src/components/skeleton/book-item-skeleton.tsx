import style from "./book-item-skeleton.module.css";

// 자동으로 스켈레톤 만들어 주는 라이브러리도 잇음
// react-loading-skeleton

export default function BookItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
      <div className={style.info_container}>
        <div className={style.title}></div>
        <div className={style.subtitle}></div>
        <br />
        <div className={style.author}></div>
      </div>
    </div>
  );
}
