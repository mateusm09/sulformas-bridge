import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class PedidoNumero1611101011109 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"Pedido",
			new TableColumn({
				name: "numero",
				type: "integer",
				isNullable: true,
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("Pedido", "numero");
	}
}
