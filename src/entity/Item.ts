import { BaseEntity, Column, OneToMany } from "typeorm";
import ItemPedido from "./ItemPedido";

class Item extends BaseEntity {
	@Column()
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
