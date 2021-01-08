import axios from "axios";
import qs from "qs";

export async function request(endpoint: string, data?: any) {
	let res = await axios.post(
		`${process.env.TINY_HOST || "https://api.tiny.com.br"}${endpoint}`,
		qs.stringify({
			token: process.env.TINY_TOKEN,
			formato: "json",
			...data,
		})
	);

	return res.data.retorno;
}
