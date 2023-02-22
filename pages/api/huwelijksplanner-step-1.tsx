// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { initialState } from "../../src/data/huwelijksplanner-state";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // const newState = {
    //   ...initialState,
    //   "registration-type": req.body.type,
    // };

    res.redirect("/huwelijksplanner-step-2");
  }
}
