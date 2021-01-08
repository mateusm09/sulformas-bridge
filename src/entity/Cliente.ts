import { BaseEntity, Column, OneToMany } from "typeorm";
import Pedido from "./Pedido";

class Cliente extends BaseEntity {
	@Column()
	cnpj: string;

	@Column()
	nomeFantasia: string;

	@Column()
	razaoSocial: string;

	@Column()
	segmento: string;

	@Column()
	cep: string;

	@Column()
	rua: string;

	@Column()
	cidade: string;

	@Column()
	estado: string;

	@Column()
	pais: string;

	@Column()
	primeiraVenda: boolean;

	@Column()
	dataCriacao: Date;

	@OneToMany(() => Pedido, (pedido) => pedido.cliente)
	pedidos: Pedido[];
}

export default Cliente;
