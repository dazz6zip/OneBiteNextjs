import { ReactNode } from "react";

export default function Layout({
  // layout.tsx는 자동으로 children 이 props 로 전달됨
  children,
}: {
  children: ReactNode;
}) {
  // 현재 경로로 시작되는 하위의 모든 경로에 적용, 중첩 가능
  return (
    <div>
      <div>임시 서치바</div>
      {children}
    </div>
  );
}
