import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 검색어를 props로 불러와야 하기 때문에 const metadata 사용 불가
// generateMetadata는 page가 전달받는 props 사용 가능
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}): Promise<Metadata> {
  // 비동기적으로 metadata 반환

  const { q } = await searchParams;

  return {
    title: `${q} : 한입북스 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q}의 검색 결과입니다`,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  return (
    <Suspense
      key={(await searchParams).q || ""}
      // 검색 페이지 내에서 쿼리스트링만 바뀔 때도 트리거됨
      // useEffect의 의존성 배열처럼 값이 바뀔 때마다 트리거되도록 key 설정
      // react는 Key가 변경되면 새로운 component로 인식하는 것을 활용
      fallback={<BookListSkeleton count={3} />}
    >
      {/* Suspense -> 스트리밍되도록 자동 설정 */}
      <SearchResult q={(await searchParams).q || ""}></SearchResult>
    </Suspense>
  );
}
