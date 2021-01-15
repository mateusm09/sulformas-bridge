import Cliente from "../entity/Cliente";
import moment from "moment";
import { request } from "./base.fetch";

async function saveToDatabase(item: any) {
	try {
		await Cliente.create({
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

export async function fetchClients() {
	const result = await request("api2/contatos.pesquisa.php", {
		dataCriacao: moment().subtract(2, "day").format("DD/MM/YYYY"),
	});
	if (result.status_processamento === 2) throw Error("Error");

	const clientsList = result.contatos;
	for (let i = 0; i < clientsList.length; i++) {
		const id = clientsList[i].contato.id;
		const clientRes = await request("api2/contato.obter.php", { id });
		if (clientRes.status_processamento === 2) throw Error("Error");

		await saveToDatabase(clientRes.contato);
	}
}
