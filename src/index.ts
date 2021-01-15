import "reflect-metadata";
import { fetchClients } from "./apiFetchers/client.fetch";
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
		// await fetchOrders();

		let obj1 = {
			a: 1,
		};

		let obj2 = {
			a: 1,
		};

		console.log(obj1 == obj2);
	} catch (error) {}
}

typeormConnection().then(() => main());
