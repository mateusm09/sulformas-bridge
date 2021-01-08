import "reflect-metadata";
import { getAllClients } from "./getters/client.get";
import { getAllVendors } from "./getters/vendedor.get";
import { typeormConnection } from "./utils/typeormConnection";

async function main() {
	try {
		// await getAllVendors();
		await getAllClients();
	} catch (error) {}
}

typeormConnection().then(() => main());
