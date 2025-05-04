import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";
// Next 에서 자동으로 이미지 최적화 해 주는 태그
// 경량화된 이미지 확장자로 가져오고 스크롤 화면에 대응한 이미지를 그때그때 로드함

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      <Image
        src={coverImgUrl}
        // 프로젝트 내 저장된 이미지가 아닌 서버 이미지일 경우 Next 내에서 자동 차단됨...
        // next.config.mjs 에서 도메인 허용 추가해야 함
        width={80}
        height={105}
        alt={`도서 ${title}의 표지 이미지`}
      />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
