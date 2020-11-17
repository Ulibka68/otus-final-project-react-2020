import { NextApiRequest, NextApiResponse } from "next";
import { saveLifeState, getLifeState } from "../../../utils/lifeSQL";

// the path /api/post/a will have the following query object:
// { "slug": ["a"] }
// /api/post/a/b  { "slug": ["a", "b"] }
// { } // GET `/api/post` (empty object)

// запрос на получение данных :
// api/life/?user=Gayrat
// eslint-disable-next-line no-restricted-syntax
export default async function lifeSQLhandler(req: NextApiRequest, res: NextApiResponse) {
	// req.query: { slug },
	// req.method,

	// console.log(req);
	// host: 'localhost:3000',
	// url: '/api/life/ab?hid=1&at-beru-warehouse=1',
	// 	method: 'GET',
	// query: { hid: '1', 'at-beru-warehouse': '1', slug: ['ab'] },

	// console.log(req?.body);
	// console.log(req?.body?.text);

	switch (req.method) {
		case "GET":
			// api/life/?user=Gayrat
			const user: string = req?.query?.user as string;
			const result = await getLifeState(user);
			res.status(200).json(result);
			break;
		case "PUT":
			await saveLifeState(req.body);
			res.status(200).json('{"insert":"ok"}');
			break;
	}
}
