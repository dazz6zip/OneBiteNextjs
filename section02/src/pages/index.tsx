import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
// app 을 제외한 다른 곳에 global css import 불가능
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
// @ : src 경로 (tsconfig.json 에서 확인 가능)

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>{" "}
        {books.map((book) => (
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
