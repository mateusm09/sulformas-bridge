import "reflect-metadata";
import { fetchOrders } from "./apiFetchers/order.fetch";
import { typeormConnection } from "./utils/typeormConnection";
import dotenv from "dotenv";

dotenv.config();

async function main() {
	try {
		await fetchOrders();
	} catch (error) {
		console.log(error);
	}
}

typeormConnection().then(() => main());
