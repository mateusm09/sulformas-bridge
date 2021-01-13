import { readdirSync } from "fs";
import Pedido from "../entity/Pedido";
import { getData } from "./base.parser";
import moment from "moment";

async function saveToDatabase(row: any) {
	await Pedido.create({
		id: row["ID"],
		data: moment(row["Data"], "DD/MM/YYYY"),
		cidade: row["Município entrega"],
		estado: row["UF entrega"],
		status: row["Situação"],
		valor: parseFloat(row),
	}).save();
}

export async function parseOrders() {
	let files = readdirSync("./data/items");

	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		let pageOrders = [];

		await getData("items", file, (row) => {
			pageOrders.push(row);
		});
	}
}
