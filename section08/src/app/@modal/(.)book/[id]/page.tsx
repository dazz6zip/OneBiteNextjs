import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page(props: any) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}

/*
    (.) to match segments on the same level
    (..) to match segments one level above
    (..)(..) to match segments two levels above
    (...) to match segments from the root app directory
    */

// 관련 자료
// https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes

// 클라이언트 사이드 렌더링 방식에만 인터셉팅 가능함!
// 해당 경로에서 새로고침시 인터셉팅 발생 안 함
