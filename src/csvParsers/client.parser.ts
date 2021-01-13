import { readdirSync } from "fs";
import moment from "moment";
import Cliente from "../entity/Cliente";
import { getData } from "./base.parser";

async function saveToDatabase(row: any) {
	try {
		await Cliente.create({
			id: row["ID"],
			nomeFantasia: row["Fantasia"],
			razaoSocial: row["Nome"],
			rua: `${row["Endereço"]} ${row["Número"]}`,
			cep: row["CEP"],
			cidade: row["Cidade"],
			estado: row["Estado"],
			pais: row["Pais"] || "Brasil",
			primeiraVenda: false,
			segmento: row["Tipos de Contatos"],
			cnpj: row["CNPJ / CPF"],
			dataCriacao: moment(),
		}).save();
	} catch (error) {
		console.log(error);
	}
}

export async function parseClients() {
	let files = readdirSync("./data/clients");

	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		getData("clients", file, saveToDatabase);
	}
}
