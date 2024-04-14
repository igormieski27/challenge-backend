const knex = require("knex");
const knexConfig = require("./knexfile").development;

const db = knex(knexConfig);

class Student {
  static async getAll() {
    return await db("students").select("*");
  }

  static async create(student) {
    return await db("students").insert(student).returning("*");
  }

  static async update(ra, updatedData) {
    await db("students").where({ ra }).update(updatedData);
    return await db("students").where({ ra }).first();
  }

  static async delete(ra) {
    return await db("students").where({ ra }).del();
  }
}

module.exports = Student;
