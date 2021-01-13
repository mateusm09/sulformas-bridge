import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class cliente1610058755649 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.createTable(
			new Table({
				name: "Cliente",
				columns: [
					{
						name: "id",
						type: "varchar",
						isPrimary: true,
					},
					{
						name: "cnpj",
						type: "varchar",
					},
					{
						name: "nomeFantasia",
						type: "varchar",
					},
					{
						name: "razaoSocial",
						type: "varchar",
					},
					{
						name: "segmento",
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
					{
						name: "primeiraVenda",
						type: "boolean",
					},
					{
						name: "dataCriacao",
						type: "timestamp",
					},
				],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable("Cliente");
	}
}
