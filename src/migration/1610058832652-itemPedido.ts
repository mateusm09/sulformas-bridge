import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class itemPedido1610058832652 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "ItemPedido",
				columns: [
					{
						name: "idPedido",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "idItem",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "quantidade",
						type: "int",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("ItemPedido");
	}
}
