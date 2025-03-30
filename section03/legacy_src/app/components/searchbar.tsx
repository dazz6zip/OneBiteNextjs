"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// app router 는 next/router 가 아닌 next/navigation 에서 import

// co-location : page, layout 같이 지정된 이름이 아닌 tsx 파일 생성 가능
export default function Searchbar() {
  // layout.tsx 전체를 client component로 설정하는 걸 피하기 위해
  // Searchbar 분리 후 client component로 지정해 줌!
  // searchbar 제외하고는 상호작용이 필요하지 않기 때문

  const router = useRouter();

  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}

/* 프리패칭 : 현재 페이지에서 Link 로 이동되는 모든 페이지 데이터를 미리 불러옴 
인덱스 페이지의 경우는 Static(정적) 페이지이기 때문에 js 불러옴
book 페이지는 Dynamic(동적) 페이지로 설정되어 있어서 js 제외 rsc payload 만 불러옴 */
