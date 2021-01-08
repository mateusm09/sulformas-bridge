import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class foreignKeys1610065255549 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const pedidoClienteFK = new TableForeignKey({
			columnNames: ["CnpjCliente"],
			referencedColumnNames: ["cnpj"],
			referencedTableName: "Cliente",
		});

		const pedidoVendedorFK = new TableForeignKey({
			columnNames: ["idVendedor"],
			referencedColumnNames: ["id"],
			referencedTableName: "Vendedor",
		});
		await queryRunner.createForeignKeys("Pedido", [pedidoClienteFK, pedidoVendedorFK]);

		const idItemItemPedidoFK = new TableForeignKey({
			columnNames: ["idItem"],
			referencedColumnNames: ["id"],
			referencedTableName: "Item",
		});

		const idPedidoItemPedidoFK = new TableForeignKey({
			columnNames: ["idPedido"],
			referencedColumnNames: ["id"],
			referencedTableName: "Pedido",
		});

		await queryRunner.createForeignKeys("ItemPedido", [idItemItemPedidoFK, idPedidoItemPedidoFK]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("Pedido", "idVendedor");
		await queryRunner.dropForeignKey("Pedido", "CnpjCliente");
		await queryRunner.dropForeignKey("ItemPedido", "idPedido");
		await queryRunner.dropForeignKey("ItemPedido", "idItem");
	}
}
