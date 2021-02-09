import { createConnection, getConnectionOptions } from "typeorm";

export async function typeormConnection() {
	const options = await getConnectionOptions("default");
	return createConnection(options);
}
