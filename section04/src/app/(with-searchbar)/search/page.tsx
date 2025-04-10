import BookItem from "@/components/book-item";
import { BookData } from "@/types";

// export const dynamic = "force-static";
// 무조건 static
// 동적 함수는 무조건 빈값 반환으로 설정됨 (알아서 변경)
// 쿼리스트링에 의존하고 있는 페이지일 경우 검색 기능이 제대로 동작하지 않을 수 있음
// cache 설정도 바뀜

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${
      (
        await searchParams
      ).q
    }`,
    { cache: "force-cache" }
    // 데이터 캐시만 적용
    // fetch 결과를 캐시에 저장해 두도록 설정
    // 접속 요청 받을 때 페이지는 새로 생성되더라도 한 번 검색된 데이터는 빠르게 응답할 수 있도록
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
