import { notFound } from "next/navigation";
import style from "./page.module.css";

// export const dynamicParams = false;
// generateStaticParams 에 지정되지 않은 값은 바로 404 페이지

export function generateStaticParams() {
  // 정적 파라미터 생성 함수
  return [{ id: "1" }, { id: "2" }, { id: "3" }];

  // 사전 렌더링 과정에서 쿼리 스트링으로 들어올 경로 미리 지정하면 미리 생성해 둠
  // Page Router 의 getStaticPaths 와 동일한 역할

  // 여기 없는 경로의 경우 접속시 실시간으로 렌더링
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${(await params).id}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다</div>;
  }

  const book = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
