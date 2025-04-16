"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// 오류는 서버나 클라이언트 모두 발생할 수 있기 때문에

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
  // 에러 복구를 위해 렌더링 다시 시도
  // 새로 서버랑 통신해서 값을 가져오는 게 아니라
  // 이미 가져온 값으로 렌더링만 재시도해 보는 것
}) {
  // Error : JS에서 제공하는 기본 Error type

  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      {/* <button onClick={() => window.location.reload()}>다시 시도</button> 
      강제 새로고침도 가능은 하지만 최적의 방법은 아님... */}
      <button
        onClick={() => {
          // startTransition : 일괄적으로 동시 처리
          // router.refresh 와 reset 이 한몸처럼
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트 리로드
            reset(); // 에러 상태 초기화 + 컴포넌트 리렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
