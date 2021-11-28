require("dotenv").config();

module.exports = {
  development: {
    username: process.env.myUsername,
    password: process.env.myPassword,
    database: process.env.database,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql",
  },
};
