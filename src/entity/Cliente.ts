import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Pedido from "./Pedido";

@Entity("Cliente")
class Cliente extends BaseEntity {
	@Column()
	@PrimaryColumn()
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
