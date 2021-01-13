import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class pedido1610058743686 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "Pedido",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "data",
						type: "timestamp",
					},
					{
						name: "cidade",
						type: "varchar",
					},
					{
						name: "estado",
						type: "varchar",
					},
					{
						name: "status",
						type: "varchar",
					},
					{
						name: "valor",
						type: "float",
					},
					{
						name: "numeroNF",
						type: "varchar",
					},
					{
						name: "idVendedor",
						type: "varchar",
						isNullable: true,
					},
					{
						name: "idCliente",
						type: "varchar",
						isNullable: true,
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("Pedido");
	}
}
