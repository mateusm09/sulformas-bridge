import "reflect-metadata";
import { fetchVendors } from "./apiFetchers/vendor.fetch";
import { parseClients } from "./csvParsers/client.parser";
import { parseItems } from "./csvParsers/item.parser";
import { parseOrders } from "./csvParsers/order.parser";

import { typeormConnection } from "./utils/typeormConnection";
import dotenv from "dotenv";

dotenv.config();

async function main() {
	try {
		await parseClients();
		await parseItems();
		await parseOrders();
		await fetchVendors();
	} catch (error) {
		console.log(error);
	}
}

typeormConnection().then(() => main());
