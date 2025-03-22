import { useRouter } from "next/router";

// 동적 라우팅 ([id] 는 :id 같은 개념)
// 캐치 올 세그먼트 ([...id] 는 id가 몇 개라도 대응)
// 옵셔널 캐치 올 세그먼트 ([[...id]] 는 아무런 path 가 없는 기본 index 경로도 대응)
export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  // 동적 파라미터도 쿼리 스트링과 동일하게 받아옴
  // 동적 파라미터의 key 는 파일 이름으로 설정 ([id] -> "id" : "...")
  // 캐치 올 세그먼트는 query가 배열 형태 (key는 index)

  // index 경로에 해당하는 경로는 캐치 올 세그먼트로 대응할 수 없음
  // ex) book/ 경로는 대응 불가

  return <h1>Book {id}</h1>;
}
