import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// 같은 경로에 loading.tsx 파일이 있을 경우 자동으로 스트리밍 동작
/* 
  스트리밍 주의점
  1. 해당 경로 아래에 있는 component 도 동일하게 스트리밍됨
  ㄴ 예를 들어 search/setting 이라는 페이지가 있을 경우 그 페이지도 스트리밍
  2. 모든 Component 가 아닌 async 비동기 component 에만 적용됨
  3. loading.tsx 파일은 page.tsx 에만 적용됨
  ㄴ 별도의 Component 에도 적용하고 싶을 경우 다른 방법 (Suspense)
  4. loading.tsx 로 설정된 Page는 쿼리 스트링 변경시 트리거되지 않음
  ㄴ 예를 들어 이미 search 페이지에서 새로운 검색을 할 경우
*/

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

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
