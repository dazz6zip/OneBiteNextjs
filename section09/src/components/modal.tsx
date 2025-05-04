"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      // dialog는 기본적으로 꺼져 있는 상태로 렌더링
      // modal 열려 있지 않으면 열린 상태로, 스크롤 상위로 고정
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      onClick={(e) => {
        // 배경이 클릭되었을 경우 뒤로가기 (모달 종료)
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      onClose={() => router.back()}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,

    document.getElementById("modal-root") as HTMLElement
  );
  // createPortal(출력할 요소, 요소 위치)
  // 하위 요소로 렌더링되지 않기 위해 createPortal 사용
}
