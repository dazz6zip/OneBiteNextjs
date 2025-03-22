// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// api 폴더 내 파일은 page가 아닌 router 정의 파일이 됨
// /api/hello 같은 경로로 api 반환 접근 (Restful 백엔드 엔드포인트처럼)

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
