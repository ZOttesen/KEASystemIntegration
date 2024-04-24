// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3307,
      user: 'root',
      password: 'password',
      database: 'classicmodels',
    }
  }
};
