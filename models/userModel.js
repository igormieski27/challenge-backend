const knex = require("knex");
const bcrypt = require("bcrypt");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "grupoa_crud",
  },
});

class User {
  static async getAll() {
    return await db("users").select("*");
  }

  static async create(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return await db("users").insert(user).returning("*");
  }

  static async update(id, updatedData) {
    await db("users").where({ id }).update(updatedData);
    return await db("users").where({ id }).first();
  }

  static async delete(id) {
    return await db("users").where({ id }).del();
  }

  static async authenticate(email, password) {
    const user = await db("users").where({ email }).first();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  }
}

module.exports = User;
