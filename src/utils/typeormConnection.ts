import { createConnection, getConnectionOptions } from "typeorm";

export async function typeormConnection() {
	const options = await getConnectionOptions(process.env.NODE_ENV);
	return createConnection(options);
}
