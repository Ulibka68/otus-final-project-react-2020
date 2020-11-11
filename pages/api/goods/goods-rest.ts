import { NextApiRequest, NextApiResponse } from "next";

export default function goodsRestHandler (req: NextApiRequest, res: NextApiResponse)  {
  res.status(200).json({ name: "John Doe" });
};

type Data = {
  name: string;
};
