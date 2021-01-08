import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import Item from "./Item";
import Pedido from "./Pedido";

@Entity("ItemPedido")
class ItemPedido extends BaseEntity {
	@Column()
	@PrimaryColumn()
	idPedido: string;

	@Column()
	@PrimaryColumn()
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
