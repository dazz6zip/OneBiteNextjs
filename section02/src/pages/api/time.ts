import type { NextApiRequest, NextApiResponse } from "next";

// api 공식 문서
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
}
