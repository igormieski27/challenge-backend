const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authenticate = require("../middlewares/autheticate"); // Certifique-se de que o caminho esteja correto

// Aplicar o middleware `authenticate` a todas as rotas para protegê-las
router.get("/", authenticate, studentController.getStudents);
router.post("/", authenticate, studentController.createStudent);
router.put("/:id", authenticate, studentController.updateStudent);
router.delete("/:id", authenticate, studentController.deleteStudent);

module.exports = router;
