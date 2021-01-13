import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import StatusPedido from "../interfaces/StatusPedido";
import Cliente from "./Cliente";
import ItemPedido from "./ItemPedido";
import Vendedor from "./Vendedor";
@Entity("Pedido")
class Pedido extends BaseEntity {
	@Column()
	@PrimaryColumn()
	id: string;

	@Column()
	data: Date;

	@Column()
	cidade: string;

	@Column()
	estado: string;

	@Column()
	status: string;

	@Column()
	valor: number;

	@Column()
	numeroNF: string;

	@Column()
	idVendedor: string;

	@Column()
	idCliente: string;

	@OneToMany(() => ItemPedido, (itemPedidos) => itemPedidos.pedido)
	itemPedidos: ItemPedido[];

	@ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
	@JoinColumn({ name: "idCliente", referencedColumnName: "id" })
	cliente: Cliente;

	@ManyToOne(() => Vendedor, (vendedor) => vendedor.pedidos)
	@JoinColumn({ name: "idVendedor", referencedColumnName: "id" })
	vendedor: Vendedor;
}

export default Pedido;
