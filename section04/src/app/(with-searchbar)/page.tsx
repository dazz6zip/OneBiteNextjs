import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// cache 옵션은 fetch 만 가능 (axios 안 됨)

// 리퀘스트 메모이제이션 : 같은 api 로드에만 사용하기 위함 (fetch 끝나면 소멸)
//  ㄴ 서버 컴포넌트 도입으로 각각 페이지가 fetch 하는 방식으로 변함 (원래는 최상단에서 fetch, 이후 전달)
//  ㄴ 서로 다른 컴포넌트에서 같은 데이터를 필요로 하는 경우 사용!!
// 리퀘스트 메모이제이션과 데이터 캐시는 전혀 다른 것

/* 사실 dynamic 이 권장되지는 않음!! */
// -> 매커니즘을 무시하고 강제 설정하는 것이 부작용 확률 있음
// -> 그렇지만 사용해야만 할 경우가 있으므로 상황 판단 필요~

// export const dynamic = "force-dynamic";
// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음 (원칙적)
// 2. force-dynamic : 페이지를 강제로 Dynamic 으로 설정
// 3. force-static : 페이지를 강제로 Static 으로 설정
// 4. error : 페이지를 강제로 static 페이지 설정 (설정하면 안 되는 케이스일 경우 오류 발생)

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
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

/* 
풀 라우트 캐시
-> 리벨리데이트, 주기적 페이지 재생성 가능함
-> STALE (상함) 페이지 반환 이후 revalidate data 로드
-> 이후 요청부터는 업데이트된 페이지 반환됨

Dynamic page
- 특정 페이지가 접속 요청을 받을 때마다 매번 변화가 생기거나 데이터가 달라질 경우
- 서버 컴포넌트에서 cache 옵션이 없거나 no-store 일 경우 다이나믹 페이지가 됨 (매번 불러와야 해서)
- 서버 컴포넌트에서 동적 함수 사용할 경우 (쿠키, 헤더, 쿼리스트링에서 값 꺼내오기)

Static Page
- Dynamic page 에 해당하지 않으면 전부 static page

동적 함수     데이터 캐시     페이지 분류
YES         NO           Dynamic Page
YES         YES          Dynamic Page
NO          NO           Dynamic Page
NO          YES          Static Page


-> Static page 의 경우 풀 라우트 캐시가 적용됨
-> 빌드 타임에 미리 페이지 렌더링 후 캐싱
-> 이후 요청 들어오면 풀 라우트 캐시에 저장된 페이지 반환!!

-> Dynamic page 의 경우 빌드 때 생성이 안 됨 
-> 경로 접근시마다 fetch 해야 함 (비교적 느림)
-> 리퀘스트 메모이제이션이나 데이터 캐시는 정상 작동!! 풀 라우트 캐시만 해당 안 되는 것
-> 되도록이면 대부분의 페이지를 Static page 로 구현하는 것이 권장됨
*/

/* 클라이언트 라우터 캐시에서는 Rcs payload 중
루트 레이아웃, 서치바 레이아웃 같은 중복된 컴포넌트를
자동으로 클라이언트 라우터 캐시에 저장해 둠
이후 호출부터는 저장해 둔 곳에서 중복 컴포넌트 가져오고
페이지 고유의 자료만! 서버에서 가져옴

새로고침이나 브라우저 재접속은 라우터 캐시 적용 안 됨*/
