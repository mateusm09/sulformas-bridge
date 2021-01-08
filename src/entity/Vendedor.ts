import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Pedido from "./Pedido";

@Entity("Vendedor")
class Vendedor extends BaseEntity {
	@Column()
	@PrimaryColumn()
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

	@Column()
	cep: string;

	@OneToMany(() => Pedido, (pedido) => pedido.vendedor)
	pedidos: Pedido[];
}

export default Vendedor;
