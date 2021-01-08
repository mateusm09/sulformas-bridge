import { BaseEntity, Column, OneToMany } from "typeorm";
import Pedido from "./Pedido";

class Vendedor extends BaseEntity {
	@Column()
	id: string;

	@Column()
	nome: string;

	@Column()
	nomeFantasia: string;

	@Column()
	situacao: string;

	@Column()
	rua: string;

	@Column()
	cidade: string;

	@Column()
	estado: string;

	@Column()
	pais: string;

	@OneToMany(() => Pedido, (pedido) => pedido.vendedor)
	pedidos: Pedido[];
}

export default Vendedor;
