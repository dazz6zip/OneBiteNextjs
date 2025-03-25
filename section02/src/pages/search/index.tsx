import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   // context : 현재 브라우저에서 받은 모든 요청 포함

//   // const q = context.query.q;
//   // SSG context 에는 query 가 없음
//   // 빌드시 한 번만 실행되는 SSG 특성상 동적인 쿼리 스트링을 꺼내 올 수 없음
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  // 위처럼 SSG 방식으로 렌더링된 페이지에 상호작용 하려면 React 에서 하던 방식으로 추가 작업
  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스 - 검색결과"></meta>
        <meta
          property="og:description"
          content="한입북스에 등록된 도서들을 만나 보세요!"
        ></meta>
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
