import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

/**
 * MySQL Connection Pool Configuration.
 *
 * @typedef {Object} MySQLPoolConfig
 * @property {string} host - MySQL server host.
 * @property {string} user - MySQL user.
 * @property {string} password - MySQL user's password.
 * @property {string} database - Database name.
 * @property {boolean} waitForConnections - Whether the pool should wait for connections.
 * @property {number} connectionLimit - Maximum number of connections in the pool.
 * @property {number} queueLimit - Maximum number of connection requests in the queue.
 */

/**
 * MySQL Connection Pool.
 * @type {import("mysql2").Pool}
 */

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Promise-based version of the MySQL Connection Pool.
 * @type {import("mysql2").PoolPromise}
 */

const promisePool = pool.promise();

export { pool, promisePool };
