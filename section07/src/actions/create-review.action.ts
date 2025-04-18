"use server";

import { revalidatePath } from "next/cache";

// 서버 액션으로 설정됨 (브라우저에서 호출 가능한 서버에서만 실행되는 함수)

export async function createReviewAction(formData: FormData) {
  // 별도 파일로 분리돼 있지 않을 경우 function 상단에 use server 기재

  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  // string 일 경우 ?.toString()

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
        // 객체를 직렬화해서 전달
      }
    );
    console.log(response.status);
    revalidatePath(`/book/${bookId}`);
    // 경로에 해당하는 페이지 자동 재검증 (재생성)
    // 주의사항
    // 1. 서버에서만 호출할 수 있는 메소드
    // 2. 페이지를 전부 재검증하기 때문에 포함된 캐시 무효화됨
    // fetch cache 옵션을 force-cache 로 설정되어 있다고 하더라도 무효화
    // 3. 풀 라우트 캐시까지도 삭제됨
    // 다음 방문시에 다이나믹 페이지처럼 생성됨 (그때 풀 라우트 캐시 업데이트)
  } catch (err) {
    console.error(err);
    return;
  }
}
