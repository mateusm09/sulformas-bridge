import moment from "moment";
import Cliente from "../entity/Cliente";
import { request } from "./base.get";

async function saveToDb(item: any) {
	let cliente = Cliente.create({
		cnpj: item.cpf_cnpj as string,
		nomeFantasia: (item.fantasia as string) || "",
		razaoSocial: item.nome as string,
		segmento: item.tipo_cliente ? (item.tipo_cliente[0].tipo as string) : "Cliente",
		cep: (item.cep as string) || "",
		rua: (item.endereco as string) + " " + (item.numero as string),
		cidade: item.cidade as string,
		estado: item.uf as string,
		pais: (item.pais as string) || "Brasil",
		primeiraVenda: true,
		dataCriacao: moment(item.data_criacao, "DD/MM/YYYY HH:mm:ss"),
	});

	return Cliente.save(cliente);
}

async function getClientsByPage(clients: Array<any>) {
	for (let i = 0; i < clients.length; i++) {
		const element = clients[i].contato;
		setTimeout(async () => {
			let res = await request("/api2/contato.obter.php", { id: element.id });
			if (res.status_processamento === 2) throw { codigo: res.codigo_erro, erros: res.erros };

			await saveToDb(res.contato);
		}, i * 100);
	}
}

export async function getAllClients() {
	let res = await request("/api2/contatos.pesquisa.php");
	if (res.status_processamento === 2) throw { codigo: res.codigo_erro, erros: res.erros };
	getClientsByPage(res.contatos);

	// for (let i = res.pagina; i < res.numero_pagina; i++) {
	// 	setTimeout(async () => {
	// 		res = await request("/api2/contatos.pesquisa.php", { pagina: i });
	// 		if (res.status_processamento === 2) throw { codigo: res.codigo_erro, erros: res.erros };
	// 		getClientsByPage(res.contatos);
	// 	}, i * 1000);
	// }
}
