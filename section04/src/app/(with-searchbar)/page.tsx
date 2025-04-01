import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// cache 옵션은 fetch 만 가능 (axios 안 됨)

// 리퀘스트 메모이제이션 : 같은 api 로드에만 사용하기 위함
//  ㄴ 서버 컴포넌트 도입으로 각각 페이지가 fetch 하는 방식으로 변함 (원래는 최상단에서 fetch, 이후 전달)
//  ㄴ 서로 다른 컴포넌트에서 같은 데이터를 필요로 하는 경우 사용!!
// 리퀘스트 메모이제이션과 데이터 캐시는 전혀 다른 것

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-store" }
    /*
    1. "cache: no-store" : 캐싱 안 함, 접속할 때마다 새로 불러옴
    2. "cache: force-cache" : 요청 결과 무조건 캐싱 
      ㄴ 초기 로드시 miss, 로드 후 set, 이후 로드시 hit
    3. "next : {revalidate : 3}" : 특정 시간(예제의 경우 3초)을 주기로 캐시 업데이트
      ㄴ 일단 캐싱된 데이터 (stale) 가져온 다음 다시 가져와서 set, 이후 로드시 hit
    4. "next" : {tags: ['a']} : 요청이 들어왔을 때 데이터 최신화

    * 15 버전부터 fetch 의 기본값 : 캐싱 안 함 (auto no cache)
    */
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

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
