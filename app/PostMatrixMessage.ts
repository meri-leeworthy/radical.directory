// import * as sdk from "matrix-js-sdk";
// const { HACKLAB_PASSWORD } = process.env;

// import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   message: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method === "POST") {
//     console.log(req);
//     const body = await JSON.parse(req.body);
//     const msg = body.message;
//     console.log("sending ", msg);
//     const client = sdk.createClient({
//       baseUrl: "https://matrix.org",
//     });
//     console.log(HACKLAB_PASSWORD);
//     if (!HACKLAB_PASSWORD) return;
//     await client.loginWithPassword("@rd-hacklab:matrix.org", HACKLAB_PASSWORD);
//     await client.sendTextMessage("!qrrnMPUbSFoyqfgYGZ:radical.directory", msg);
//     res.status(200).json({ message: "submitted" });
//   }
// }
