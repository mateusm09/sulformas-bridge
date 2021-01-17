import Vendedor from "../entity/Vendedor";
import { request } from "./base.fetch";

async function saveToDatabase(item: any) {
	return Vendedor.create({
		id: item.id,
		nome: item.nome,
		nomeFantasia: item.fantasia || "",
		rua: `${item.endereco} ${item.numero}`,
		cep: item.cep || "",
		cidade: item.cidade || "",
		estado: item.uf || "",
		situacao: item.situacao,
		pais: item.pais || "Brasil",
	}).save();
}

export async function fetchVendors() {
	const result = await request("api2/vendedores.pesquisa.php", {});
	if (result.status_processamento === 2) throw Error("Error");

	// return saveToDatabase(result.contato);
	const vendorsList = result.vendedores;
	for (let i = 0; i < vendorsList.length; i++) {
		const vendor = vendorsList[0].vendedor;

		await saveToDatabase(vendor);
	}
}

export async function searchAndSaveVendor(id: string) {
	const result = await request("api2/vendedores.pesquisa.php", {});
	if (result.status_processamento === 2) throw Error("Error");

	const vendorsList = result.vendedores;
	const vendor = vendorsList.find((v) => v.vendedor.id === id);

	return saveToDatabase(vendor.vendedor);
}
