import { BookData } from "@/types";

export default async function FetchOneBook(
  id: number
): Promise<BookData | null> {
  // 오류 발생하면 null 을 반환하기 때문에
  const url = `https://onebite-books-server-main-iota-six.vercel.app/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
