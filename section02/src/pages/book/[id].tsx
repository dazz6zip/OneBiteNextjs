import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import FetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

// 동적 라우팅 ([id] 는 :id 같은 개념)
// 캐치 올 세그먼트 ([...id] 는 id가 몇 개라도 대응)
// 옵셔널 캐치 올 세그먼트 ([[...id]] 는 아무런 path 가 없는 기본 index 경로도 대응)

// 동적 파라미터도 쿼리 스트링과 동일하게 받아옴
// 동적 파라미터의 key 는 파일 이름으로 설정 ([id] -> "id" : "...")
// 캐치 올 세그먼트는 query가 배열 형태 (key는 index)

// index 경로에 해당하는 경로는 캐치 올 세그먼트로 대응할 수 없음
// ex) book/ 경로는 대응 불가

export const getStaticPaths = () => {
  // 현재 페이지에서 동적 경로로 렌더링될 수 있는 모든 경우의 수 렌더링
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      // params 는 반드시 string
    ],
    // 예외 처리
    fallback: true,
    // false      : 404
    // true       : props가 없는 버전 페이지 즉시 반환, 이후 props 따로 처리하여 반환
    // "blocking" : SSR 처럼 즉시 사전 렌더링하여 반환 (새로운 데이터가 계속 추가되어야 하는 경우에도 사용 가능), 로딩 길어질 수 있음
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  // undefined 이 아닐 거라는 단언 -> ! 추가

  const book = await FetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
      // 불러오지 못했을 경우 자동으로 404
    };
  }
  return { props: { book } };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스 - 검색결과</title>
          <meta property="og:image" content="/thumbnail.png"></meta>
          <meta property="og:title" content="한입북스 - 검색결과"></meta>
          <meta
            property="og:description"
            content="한입북스에 등록된 도서들을 만나 보세요!"
          ></meta>
        </Head>
        {/* meta 태그 (SEO) 는 fallback 상태일 때 적용이 안 됨 
        로딩 화면에도 SEO 추가로 fallback 상태여도 기본적인 태그는 Return 가능하도록*/}
        <div>로딩 중입니다...</div>
      </>
    );
  }

  if (!book) {
    return "문제가 발생했습니다! 다시 시도해 주세요.";
  }
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <>
      <Head>
        <title>한입북스 - {title}</title>
        <meta property="og:image" content={coverImgUrl}></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
      </Head>
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
    </>
  );
}
