import Item from "../entity/Item";
import { request } from "./base.fetch";

async function saveToDatabase(item: any) {
	return Item.create({
		id: item.id,
		descricao: item.nome,
		valor: item.preco,
		categoria: item.categoria,
		marca: item.marca,
		subCategoria: "",
		localizacao: item.localizacao,
	}).save();
}

export async function fetchItem(id: number) {
	let res = await request("api2/produto.obter.php", { id });
	if (res.status_processamento === 2) return;

	return saveToDatabase(res.produto);
}
