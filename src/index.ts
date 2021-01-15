import "reflect-metadata";
import { parseClients } from "./csvParsers/client.parser";
import { parseItems } from "./csvParsers/item.parser";
import { parseOrders } from "./csvParsers/order.parser";

import { typeormConnection } from "./utils/typeormConnection";

async function main() {
	try {
		// await parseClients();
		// await parseItems();
		await parseOrders();
	} catch (error) {}
}

typeormConnection().then(() => main());
