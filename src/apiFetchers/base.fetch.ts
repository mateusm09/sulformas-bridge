import axios from "axios";
import qs from "qs";
import { waitFor } from "../utils";

let requestCounter = 0;

export async function request(endpoint: string, data: any) {
	try {
		if (requestCounter >= 50) {
			console.log("need wait 1 minute");

			await waitFor(61 * 1000);
			requestCounter = 0;
		}

		const res = await axios.post(
			`${process.env.TINY_HOST}/${endpoint}`,
			qs.stringify({
				...data,
				token: process.env.TINY_TOKEN,
				formato: "json",
			})
		);

		requestCounter++;
		return res.data.retorno;
	} catch (error) {
		console.log("request error:", error);
	}
}
