import csv from "csv-parser";
import { createReadStream } from "fs";

type Callback = (data: string | Buffer) => Promise<void>;

export async function getData(folder: string, file: string, dataCallback: Callback) {
	return new Promise((resolve, reject) => {
		createReadStream(`./data/${folder}/${file}`)
			.pipe(csv())
			.on("data", async (row) => await dataCallback(row))
			.on("end", () => resolve(true))
			.on("error", (error) => reject(error));
	});
}
