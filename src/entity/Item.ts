import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import ItemPedido from "./ItemPedido";

@Entity("Item")
class Item extends BaseEntity {
	@Column()
	@PrimaryColumn()
	id: string;

	@Column()
	categoria: string;

	@Column()
	subCategoria: string;

	@Column()
	marca: string;

	@Column()
	valor: number;

	@Column()
	descricao: string;

	@Column()
	localizacao: string;

	@OneToMany(() => ItemPedido, (itemPedidos) => itemPedidos.item)
	itemPedidos: ItemPedido[];
}

export default Item;
