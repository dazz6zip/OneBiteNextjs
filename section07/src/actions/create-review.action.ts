"use server";
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
  } catch (err) {
    console.error(err);
    return;
  }
}
