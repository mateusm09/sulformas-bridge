const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

module.exports = [
	{
		name: "default",
		type: "postgres",
		host: process.env.DB_HOST,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		synchronize: false,
		logging: false,
		entities: [`${__dirname}/src/entity/**/*.ts`],
		migrations: [`${__dirname}/src/migration/**/*.ts`],
		subscribers: [`${__dirname}/src/subscriber/**/*.ts`],
		cli: {
			entitiesDir: "src/entity",
			migrationsDir: "src/migration",
			subscribersDir: "src/subscriber",
		},
	},
];
