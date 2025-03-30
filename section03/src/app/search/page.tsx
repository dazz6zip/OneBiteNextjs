export default async function Page({
  // 서버 컴포넌트라서 함수 async 가능 (추후 자세한 설명 있음)
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  // 쿼리스트링, url 파라미터 자동으로 props 전달
  // 구조분해할당으로 searchParams 가져오기
  const { q } = await searchParams;
  return <div>Search Page {q}</div>;
}
