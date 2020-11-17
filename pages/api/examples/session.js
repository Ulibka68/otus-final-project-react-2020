// This is an example of how to access a session from an API route
import { getSession } from "next-auth/client";

export default async (req, res) => {
	const session = await getSession({ req });
	// res.send(JSON.stringify(session, null, 2))

	// https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-getsession
	if (session) {
		// Signed in
		console.log("Session", JSON.stringify(session, null, 2));
		res.send(JSON.stringify(session, null, 2));
	} else {
		// Not Signed in
		res.status(401);
	}
	res.end();
};
