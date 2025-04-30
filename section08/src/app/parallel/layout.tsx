import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>parallel</Link>&nbsp;
        <Link href={"/parallel/setting"}>parallel/setting</Link>
        {/* /parallel/setting 경로에서 새로고침 -> 초기접근
        이 경우 이전 값 (children, sidebar) 이 없어서 404
        ㄴ feed 에는 setting 폴더 (경로) 가 있어서 괜찮지만
        ㄴ children(page)나 sidebar 에는 /setting 폴더 (경로) 가 없으므로
        default page 필요 */}
      </div>
      <br />
      {sidebar}

      {feed}
      {children}
    </div>
  );
}
