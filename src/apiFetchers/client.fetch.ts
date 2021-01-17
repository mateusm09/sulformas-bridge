import Cliente from "../entity/Cliente";
import moment from "moment";
import { request } from "./base.fetch";

async function saveToDatabase(item: any) {
	try {
		return Cliente.create({
			id: item.id,
			nomeFantasia: item.fantasia,
			razaoSocial: item.nome,
			rua: `${item.endereco} ${item.numero}`,
			cep: item.cep,
			cidade: item.cidade,
			estado: item.uf,
			pais: item.pais || "Brasil",
			primeiraVenda: false,
			segmento: item.tipos_contato && item.tipos_contato[0].tipo,
			cnpj: item.cpf_cnpj,
			dataCriacao: moment(item.data_criacao, "DD/MM/YYYY hh:mm:ss"),
		}).save();
	} catch (error) {
		console.log(error);
	}
}

export async function fetchClient(id: number) {
	const result = await request("api2/contato.obter.php", {
		id,
	});
	if (result.status_processamento === 2) throw Error("Error");

	return saveToDatabase(result.contato);

	// const clientsList = result.contatos;
	// for (let i = 0; i < clientsList.length; i++) {
	// 	const id = clientsList[i].contato.id;
	// 	const clientRes = await request("api2/contato.obter.php", { id });
	// 	if (clientRes.status_processamento === 2) throw Error("Error");

	// 	await saveToDatabase(clientRes.contato);
	// }
}

export async function searchAndSaveClient(cnpj: string) {
	const result = await request("api2/contatos.pesquisa.php", {
		cpf_cnpj: cnpj,
	});
	if (result.status_processamento === 2) throw Error("Error");

	// console.log(result);

	const client = result.contatos[0].contato;
	return fetchClient(client.id);
}
