"use client";
import { useState } from "react";

// co-location : page, layout 같이 지정된 이름이 아닌 tsx 파일 생성 가능
export default function Searchbar() {
  // layout.tsx 전체를 client component로 설정하는 걸 피하기 위해
  // Searchbar 분리 후 client component로 지정해 줌!
  // searchbar 제외하고는 상호작용이 필요하지 않기 때문

  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
}
