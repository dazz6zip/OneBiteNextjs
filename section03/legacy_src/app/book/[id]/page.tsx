export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 동적 파라미터
  // page router 와 동일하게
  // [...id] 로 캐치 올 세그먼트 설정하면 url 파라미터가 몇 개든 경로 대응됨
  // [[...id]] 로 옵셔널 설정하면 book의 모든 경로 대응
  const { id } = await params;
  return <div>book/[id] page : {id}</div>;
}
