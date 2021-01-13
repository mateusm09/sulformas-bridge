import "reflect-metadata";
import { parseClients } from "./csvParsers/client.parser";
import { parseItems } from "./csvParsers/item.parser";

import { typeormConnection } from "./utils/typeormConnection";

async function main() {
	try {
		// await parseClients();
		await parseItems();
	} catch (error) {}
}

typeormConnection().then(() => main());
