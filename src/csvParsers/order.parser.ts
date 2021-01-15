import { readdirSync } from "fs";
import Pedido from "../entity/Pedido";
import { getData } from "./base.parser";
import moment from "moment";
import ItemPedido from "../entity/ItemPedido";
import Vendedor from "../entity/Vendedor";
import Item from "../entity/Item";
import { Like } from "typeorm";
import Cliente from "../entity/Cliente";

async function saveToDatabase(row: any) {
	try {
		let pedido = await Pedido.findOne(row["ID"]);

		if (!pedido) {
			let vendedor = await Vendedor.findOne({ where: { nome: Like(row["Vendedor"]) } });
			let cliente = await Cliente.findOne(row["ID contato"]);
			if (!cliente) {
				cliente = await Cliente.create({
					id: row["ID contato"],
					nomeFantasia: "",
					razaoSocial: row["Nome do contato"],
					rua: `${row["Endereço"]} ${row["Endereço Nro"]}`,
					cep: row["CEP"],
					cidade: row["Município"],
					estado: row["UF"],
					pais: row["Pais"] || "Brasil",
					primeiraVenda: false,
					segmento: "",
					cnpj: row["CPF/CNPJ"],
					dataCriacao: moment(row["Data"], "DD/MM/YYYY"),
				}).save();
			}

			pedido = await Pedido.create({
				id: row["ID"],
				data: moment(row["Data"], "DD/MM/YYYY"),
				cidade: row["Município entrega"] || row["Município"],
				estado: row["UF entrega"] || row["UF"],
				status: row["Situação"],
				valor: 0,
				numeroNF: "",
				idCliente: cliente.id,
				idVendedor: vendedor && vendedor.id,
			}).save();

			// console.log("vendedor:", row["Vendedor"], "dbVendedor:", vendedor);
		}

		let item = await Item.findOne(row["ID produto"]);

		if (!item) {
			item = await Item.create({
				id: row["ID produto"],
				descricao: row["Descrição"],
				valor: parseFloat(row["Valor unitário"].replace(",", ".") || "0"),
				categoria: "",
				marca: "",
				subCategoria: "",
				localizacao: "",
			}).save();
		}

		await ItemPedido.create({
			idPedido: row["ID"],
			idItem: row["ID produto"],
			quantidade: parseInt(row["Quantidade"].replace(",", ".") || "0"),
		}).save();

		let valor = pedido.valor;
		valor +=
			parseInt(row["Quantidade"].replace(",", ".") || "0") *
			parseFloat(row["Valor unitário"].replace(",", ".") || "0");
		pedido.valor = valor;

		await pedido.save();
	} catch (error) {
		console.log(error);
	}
}

export async function parseOrders() {
	let files = readdirSync("./data/orders");

	for (let i = 0; i < files.length; i++) {
		let file = files[i];
		let currentOrders = [];
		await getData("orders", file, async (row) => {
			currentOrders.push(row);
		});

		for (let j = 0; j < currentOrders.length; j++) {
			const row = currentOrders[j];
			await saveToDatabase(row);
		}
	}
}
