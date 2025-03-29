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
    revalidate: 3,
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

/*
장점
1. 간편한 페이지 라우팅
2. 다양한 방식의 사전 렌더링
  SSR : 요청이 들어올 때마다 사전 렌더링 / 최신 데이터 보장!
        ㄴ 하지만 또다른 백엔드 서버와 연동되었을 경우 데이터를 가져오는 과정에서 딜레이 발생 가능
  SSG : 빌드 타임에 미리 페이지를 사전 렌더링 / 빌드 완료 이후 접속 요청은 빠른 속도로 응답 가능
        ㄴ SSR 의 딜레이 문제 해결
        ㄴ 그러나 빌드 이후 재생성을 하지 않기에 최신 데이터 반영 어려움
  ISR : SSG 방식, 일정 시간마다 새로운 페이지 반환
        ㄴ 시간 기준, 혹은 유저의 특정 기준 충족시 (온디맨드 방식)
  * 페이지별로 최적의 렌더링 방식 결정 가능!

  단점
  1. 페이지별 레이아웃 설정 번거로움
    ㄴ 매번 getLayout 함수 생성해야 함
  2. 데이터 페칭이 페이지 컴포넌트에 집중됨
    ㄴ 특정 페이지에 필요한 데이터를 사전 렌더링 (서버에서 불러오기) 하려면 
    ㄴ getStaticProps 같은 메소드 활용
    ㄴ 이후 받은 response 를 페이지 컴포넌트에 props 형태로만 전달해 줘야 했음
    ㄴ 페이지가 아닌 다른 Component에 데이터 전달 번거로움
  3. 불필요한 Component들이 js bundle 에 포함
    ㄴ 하이드레이션을 위해 서버에서 보내 주는 js bundle이
    ㄴ 굳이 전달되지 않아도 되는 불필요한 component 까지 전달함
    ㄴ ex. 상호작용하는 기능이 없어서 하이드레이션이 필요없는 Component
*/
