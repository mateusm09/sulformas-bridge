import { BaseEntity, Column, ManyToOne, OneToMany } from "typeorm";
import StatusPedido from "../interfaces/StatusPedido";
import Cliente from "./Cliente";
import ItemPedido from "./ItemPedido";
import Vendedor from "./Vendedor";

class Pedido extends BaseEntity {
	@Column()
	id: string;

	@Column()
	data: Date;

	@Column()
	cidade: string;

	@Column()
	estado: string;

	@Column()
	status: StatusPedido;

	@Column()
	valor: number;

	@Column()
	numeroNF: string;

	@Column()
	idVendedor: string;

	@Column()
	CnpjCliente: string;

	@OneToMany(() => ItemPedido, (itemPedidos) => itemPedidos.pedido)
	itemPedidos: ItemPedido[];

	@ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
	cliente: Cliente;

	@ManyToOne(() => Vendedor, (vendedor) => vendedor.pedidos)
	vendedor: Vendedor;
}

export default Pedido;
