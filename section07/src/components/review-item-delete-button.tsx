"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import { useActionState, useEffect, useRef } from "react";

// review-item 을 전체 클라이언트 컴포넌트로 변환하지 않도록 삭제하기 버튼만 분리
export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="bookId" value={bookId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>
          {/* submit 은 강제로 폼 제출함 (유효성 검증 같은 거 안 함)
        requestSubmit 으로 해야 onSubmit 과 비슷하게 안정적으로 동작 */}
          삭제하기
        </div>
      )}
    </form>
  );
}
