import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `https://onebite-books-server-main-iota-six.vercel.app/book`;

  if (q) {
    // 매개변수가 있을 경우 (검색 결과를 반환해야 할 경우)
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
