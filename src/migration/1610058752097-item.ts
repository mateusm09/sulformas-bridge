import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class item1610058752097 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "Item",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "categoria",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "subCategoria",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "marca",
						type: "varchar",
					},
					{
						name: "valor",
						type: "float",
					},
					{
						name: "descricao",
						type: "varchar",
					},
					{
						name: "localizacao",
						type: "varchar",
						isNullable: true,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("Item");
	}
}
