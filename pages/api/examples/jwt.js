// This is an example of how to read a JSON Web Token from an API route
import jwt from "next-auth/jwt";

const secret = process.env.SECRET;

export default async (req, res) => {
	// https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken
	const token = await jwt.getToken({ req, secret });
	if (token) {
		// Signed in
		console.log("JSON Web Token", JSON.stringify(token, null, 2));
		res.send(JSON.stringify(token, null, 2));
	} else {
		// Not Signed in
		res.status(401);
	}
	res.end();
};
