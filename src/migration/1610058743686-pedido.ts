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
						type: "enum",
						enum: [
							"aberto",
							"aprovado",
							"preparando_envio",
							"faturado",
							"pronto_envio",
							"enviado",
							"entregue",
							"cancelado",
						],
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
						name: "CnpjCliente",
						type: "varchar",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("Pedido");
	}
}
