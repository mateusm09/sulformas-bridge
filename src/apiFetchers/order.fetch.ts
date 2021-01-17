import { request } from "./base.fetch";
import moment from "moment";
import Pedido from "../entity/Pedido";
import Cliente from "../entity/Cliente";
import { Like } from "typeorm";
import ItemPedido from "../entity/ItemPedido";
import Item from "../entity/Item";
import { searchAndSaveClient } from "./client.fetch";
import { fetchItem } from "./item.fetch";
import { searchAndSaveVendor } from "./vendor.fetch";

async function saveToDatabase(item: any) {
	try {
		let cliente = await searchAndSaveClient(item.cliente.cpf_cnpj);
		let vendedor = await searchAndSaveVendor(item.id_vendedor);

		await Pedido.create({
			id: item.id,
			data: moment(item.data_pedido, "DD/MM/YYYY"),
			cidade: (item.endereco_entrega && item.endereco_entrega.cidade) || item.cliente.cidade,
			estado: (item.endereco_entrega && item.endereco_entrega.uf) || item.cliente.uf,
			status: item.situacao,
			valor: parseFloat(item.total_pedido),
			numeroNF: "",
			idCliente: cliente && cliente.id,
			idVendedor: item.id_vendedor !== "0" ? item.id_vendedor : null,
		}).save();

		if (item.itens) {
			const itemsList = item.itens;
			for (let i = 0; i < itemsList.length; i++) {
				const it = itemsList[i].item;

				await fetchItem(it.id_produto);

				await ItemPedido.create({
					idPedido: item.id,
					quantidade: parseInt(it.quantidade),
					idItem: it.id_produto,
				}).save();
			}
		}
	} catch (error) {
		console.log(error);
	}
}

export async function fetchOrders() {
	const result = await request("api2/pedidos.pesquisa.php", {
		dataInicialOcorrencia: moment("17/01/2021", "DD/MM/YYYY").subtract(2, "days").format("DD/MM/YYYY"),
	});

	const ordersList = result.pedidos;
	for (let i = 0; i < ordersList.length; i++) {
		const id = ordersList[i].pedido.id;
		const orderRes = await request("api2/pedido.obter.php", { id });
		if (orderRes.status_processamento === 2) throw Error("Error");

		await saveToDatabase(orderRes.pedido);
	}
}
