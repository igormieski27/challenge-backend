const User = require("../models/userModel");
const { generateToken } = require("../middlewares/helpers/jwtHelper");

// Controller function to get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });

    // Após criar o usuário com sucesso, gera um token JWT para esse usuário
    const token = generateToken(newUser);

    // Retorna o token JWT junto com a resposta de criação do usuário
    res.status(201).json({ newUser, token });
  } catch (error) {
    if (error.message.includes("users_email_unique")) {
      // Se o erro for de violação de chave única (email duplicado), retorne um status 409 (Conflito)
      res.status(409).json({ error: "Email already exists" });
    } else {
      // Se for outro tipo de erro, retorne o status 500 (Erro interno do servidor)
      res.status(500).json({ error: error.message });
    }
  }
};

// Controller function to update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await User.update(id, { name, email, password });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.delete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.authenticate(email, password);
    const token = generateToken(user);
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
