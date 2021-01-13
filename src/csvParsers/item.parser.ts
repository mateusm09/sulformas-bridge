import { readdirSync } from "fs";
import moment from "moment";
import Item from "../entity/Item";
import { getData } from "./base.parser";

async function saveToDatabase(row: any) {
	try {
		await Item.create({
			id: row["ID"],
			descricao: row["Descrição"],
			categoria: row["Categoria"],
			marca: row["Marca"],
			valor: parseFloat(row["Preço"].replace(",", ".") || "0"),
		}).save();
	} catch (error) {
		console.log(error);
	}
}

export async function parseItems() {
	let files = readdirSync("./data/items");

	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		await getData("items", file, saveToDatabase);
	}
}
