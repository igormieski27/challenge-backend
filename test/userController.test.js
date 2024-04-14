const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
const model = require("../models/userModel");

chai.use(chaiHttp);

describe("User Authentication", () => {
  let createdUserId;

  it("deve retornar 401 para login inválido", async () => {
    const res = await chai
      .request(app)
      .post("/users/login")
      .send({ email: "401UNAUTHORIZEDTEST", password: "123" });

    expect(res).to.have.status(401);
    expect(res.body).to.not.have.property("token");
    expect(res.body).to.not.have.property("user");
    expect(res.body.error).to.equal("Invalid credentials");
  });
  it("deve retornar código 409 para cadastro com email existente", async () => {
    const res = await chai
      .request(app)
      .post("/users")
      .send({ name: "Igor", email: "testelogin", password: "zap" });

    expect(res).to.have.status(409);
    expect(res.body.error).to.equal("Email already exists");
  });

  it("deve retornar código 201 para cadastro com dados válidos", async () => {
    const res = await chai.request(app).post("/users").send({
      name: "Igor",
      email: "test3@gmail.com",
      password: "1233",
    });
    expect(res).to.have.status(201);
    createdUserId = res.body.newUser[0].id;
  });

  it("deve retornar 200 para login válido", async () => {
    const res = await chai.request(app).post("/users/login").send({
      email: "test3@gmail.com",
      password: "1233",
    });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
    expect(res.body).to.have.property("user");
    expect(res.body.message).to.equal("Login successful");
    if (createdUserId) {
      const deleted_user = await model.delete(createdUserId);
    }
  });
});
