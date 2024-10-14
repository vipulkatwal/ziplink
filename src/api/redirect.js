import { getLongUrl } from "../src/db/apiUrls";

export default async function handler(req, res) {
	const { shortId } = req.query;

	try {
		const urlData = await getLongUrl(shortId);

		if (urlData && urlData.original_url) {
			// Redirect to the original URL
			res.redirect(301, urlData.original_url);
		} else {
			// Short URL not found
			res.status(404).send("Short URL not found");
		}
	} catch (error) {
		console.error("Error in redirect:", error);
		res.status(500).send("Server error");
	}
}
