import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import style from "./[id].module.css";
import FetchOneBook from "@/lib/fetch-one-book";

// 동적 라우팅 ([id] 는 :id 같은 개념)
// 캐치 올 세그먼트 ([...id] 는 id가 몇 개라도 대응)
// 옵셔널 캐치 올 세그먼트 ([[...id]] 는 아무런 path 가 없는 기본 index 경로도 대응)

// 동적 파라미터도 쿼리 스트링과 동일하게 받아옴
// 동적 파라미터의 key 는 파일 이름으로 설정 ([id] -> "id" : "...")
// 캐치 올 세그먼트는 query가 배열 형태 (key는 index)

// index 경로에 해당하는 경로는 캐치 올 세그먼트로 대응할 수 없음
// ex) book/ 경로는 대응 불가

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  // undefined 이 아닐 거라는 단언 -> ! 추가

  const book = await FetchOneBook(Number(id));

  return { props: { book } };
};

export default function Page({
  book,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) {
    return "문제가 발생했습니다! 다시 시도해 주세요.";
  }
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
