import { ReactNode } from "react";
import Searchbar from "../components/searchbar";

export default function Layout({
  // layout.tsx는 자동으로 children 이 props 로 전달됨
  children,
}: {
  children: ReactNode;
}) {
  // 현재 경로로 시작되는 하위의 모든 경로에 적용, 중첩 가능

  // client component 는 최대한 줄여야 하기 때문에 Component 분리!!
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
