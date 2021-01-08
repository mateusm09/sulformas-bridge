import { BaseEntity, Column, JoinColumn, ManyToOne } from "typeorm";
import Item from "./Item";
import Pedido from "./Pedido";

class ItemPedido extends BaseEntity {
	@Column()
	idPedido: string;

	@Column()
	idItem: string;

	@Column()
	quantidade: number;

	@ManyToOne(() => Pedido, (pedido) => pedido.itemPedidos)
	@JoinColumn({ name: "idPedido", referencedColumnName: "id" })
	pedido: Pedido;

	@ManyToOne(() => Item, (item) => item.itemPedidos)
	@JoinColumn({ name: "idItem", referencedColumnName: "id" })
	item: Item;
}

export default ItemPedido;
