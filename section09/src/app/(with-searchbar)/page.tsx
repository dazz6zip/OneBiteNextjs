import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Metadata } from "next";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }
  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 실습을 위한 dynamic 설정이었으므로 주석 처리
// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "한입북스",
  description: "한입북스에 등록된 도서를 만나 보세요",
  openGraph: {
    title: "한입북스",
    description: "한입북스에 등록된 도서를 만나 보세요",
    images: ["/thumbnail.png"],
    // public 경로
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
