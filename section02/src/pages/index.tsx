import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import React, { ReactNode } from "react";
// app 을 제외한 다른 곳에 global css import 불가능
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
// @ : src 경로 (tsconfig.json 에서 확인 가능)
import Head from "next/head";

/*
Next.js 제공 함수
Page Component에 먼저 실행되어서 Component에 필요한 데이터를 불러오는 함수
반환값은 반드시 props 라는 이름을 가진 하나의 객체
사전 렌더링이 되는 과정에서, 서버 측에서 딱 한 번만 실행됨

getServerSideProps : SSR 방식으로 렌더링, 반환값 InferGetServerSidePropsType 설정
getStaticProps : SSG 방식으로 렌더링, 반환값 InferGetStaticPropsType 설정

따로 설정하지 않을 경우 SSG 가 default
npm run dev 는 개발 모드라서 SSG 확인이 불가능하므로 npm run build 후 npm run start 해서 테스트
*/

export const getStaticProps = async () => {
  console.log("인덱스 페이지");

  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();
  // -> 직렬 처리라서 비교적 느림. 동시 처리 필요

  const [allBooks, recoBooks] = await Promise.all(
    // 인수 안에 있는 함수를 모두 동시에 처리하는 메소드
    [fetchBooks(), fetchRandomBooks()]
  );

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate: 3,
    // revalidate : 재검증하다
    // ISR 방식으로 3초마다 정적 페이지 다시 생성
    // ISR : 증분 정적 재생성 / 기본적으로는 SSG 지만, 주기적으로 재생성해 SSR 의 장점도 갖고 있음
    // ISR 적용이 어려운 페이지 -> 시간과 관계없이 사용자의 상호작용으로 업데이트되는 페이지

    // 요청 기반으로 업데이트하는 ISR 방식 : On-Demand ISR
    // 온디맨드 사용으로 거의 대부분의 페이지를 ISR 방식으로 설정 가능함
    // api/revalidate.ts 참고
  };
};

// getServerSideProps 에서 return 된 값을 인자로 사용함
// 일반 Page Component 도 서버에서 한 번 실행된 후 Hydration 될 때 재실행
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스"></meta>
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나 보세요!"
        ></meta>
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>{" "}
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

// 특정 페이지를 인자로 들어오면 SerachableLayout 으로 묶어서 return
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
