const config = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "postgres",
      database: "grupoa_crud",
    },
  },
};

module.exports = config;
