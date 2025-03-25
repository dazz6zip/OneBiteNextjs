import { NextApiRequest, NextApiResponse } from "next";

// 이 Hanlder api를 호출하면 인덱스 경로의 데이터를 다시 가져옴 (업데이트)
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    // 인덱스 경로를 재생성하기 위해
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidation Failed");
  }
}
