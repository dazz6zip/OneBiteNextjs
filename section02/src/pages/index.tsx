import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import React, { ReactNode, useEffect } from "react";
// app 을 제외한 다른 곳에 global css import 불가능
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
// @ : src 경로 (tsconfig.json 에서 확인 가능)

// SSR 방식으로 렌더링됨 (getServerSideProps 가 약속된 이름임)
// 사전 렌더링이 되는 과정에서, 서버 측에서 딱 한 번만 실행됨
// Page Component에 먼저 실행되어서 Component에 필요한 데이터를 불러오는 함수
// 반환값은 반드시 props 라는 이름을 가진 하나의 객체
export const getServerSideProps = async () => {
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
  };
};

// getServerSideProps 에서 return 된 값을 인자로 사용함
// 일반 Page Component 도 서버에서 한 번 실행된 후 Hydration 될 때 재실행
export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // InferGetServerSidePropsType : getServerSideProps 반환값 자동 추론

  return (
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
  );
}

// 특정 페이지를 인자로 들어오면 SerachableLayout 으로 묶어서 return
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
