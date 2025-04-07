import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* 클라이언트측에서만 렌더링되도록 Suspense 태그 사용
        searchbar 는 쿼리 스트링을 받는데 사전 렌더링 과정에서는 쿼리 스트링이 없으므로 
        
        Suspense 로 감싸 줬으므로 쿼리 스트링 로드 전에는 Loading 문구 출력 */}
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
