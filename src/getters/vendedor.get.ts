import Vendedor from "../entity/Vendedor";
import { request } from "./base.get";

async function saveToDb(item: any) {
	let vendor = Vendedor.create({
		id: item.id as string,
		nome: item.nome as string,
		nomeFantasia: item.fantasia as string,
		rua: item.endereco as string,
		cidade: item.cidade as string,
		estado: item.uf as string,
		pais: "Brasil",
		situacao: item.situacao as string,
		cep: item.cep as string,
	});

	return Vendedor.save(vendor);
}

export async function getAllVendors() {
	const iterateList = async (vendors) => {
		for (let i = 0; i < vendors.length; i++) {
			const element = vendors[i].vendedor;
			await saveToDb(element);
		}
	};

	let res = await request("/api2/vendedores.pesquisa.php");
	if (res.status_processamento === 2) throw { codigo: res.codigo_erro, erros: res.erros };
	iterateList(res.vendedores);

	for (let i = res.pagina; i < res.numero_pagina; i++) {
		setTimeout(async () => {
			res = await request("/api2/vendedores.pesquisa.php", { pagina: i });
			if (res.status_processamento === 2) throw { codigo: res.codigo_erro, erros: res.erros };
			iterateList(res.vendedores);
		}, i * 1000);
	}
}
