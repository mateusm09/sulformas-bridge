import "reflect-metadata";
import { fetchOrders } from "./apiFetchers/order.fetch";
import { parseClients } from "./csvParsers/client.parser";
import { parseItems } from "./csvParsers/item.parser";
import { parseOrders } from "./csvParsers/order.parser";

import { typeormConnection } from "./utils/typeormConnection";

async function main() {
	try {
		// await parseClients();
		// await parseItems();
		// await parseOrders();
		// await fetchClients();
		await fetchOrders();
	} catch (error) {
		console.log(error);
	}
}

typeormConnection().then(() => main());
