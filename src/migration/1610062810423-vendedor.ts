import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class vendedor1610062810423 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: "Vendedor",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "nome",
						type: "varchar",
					},
					{
						name: "nomeFantasia",
						type: "varchar",
					},
					{
						name: "situacao",
						type: "varchar",
					},
					{
						name: "cep",
						type: "varchar",
					},
					{
						name: "rua",
						type: "varchar",
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
						name: "pais",
						type: "varchar",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
