
module.exports = {
	client: 'mysql',
	connection: {
		user: 'beb68ed6f91424:4044d82e',
		host: 'us-cdbr-iron-east-02.cleardb.net',
		password: '',
		database: 'heroku_5f02af41407277c'
	},
	pool: {
		min: 0,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};
