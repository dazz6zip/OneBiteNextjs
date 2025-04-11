export default function Loading() {
  return <div>Loading</div>;
}

/* 
스트리밍 주의점
1. 해당 경로 아래에 있는 component 도 동일하게 스트리밍됨
ㄴ 예를 들어 search/setting 이라는 페이지가 있을 경우 그 페이지도 스트리밍
2. 모든 Component 가 아닌 async 비동기 component 에만 적용됨
3. loading.tsx 파일은 page.tsx 에만 적용됨
ㄴ 별도의 Component 에도 적용하고 싶을 경우 다른 방법
4. loading.tsx 로 설정된 Page는 쿼리 스트링 변경시 트리거되지 않음
ㄴ 예를 들어 이미 search 페이지에서 새로운 검색을 할 경우
*/
