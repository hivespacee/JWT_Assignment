import express from "express";
import {
    register,
    login,
    getSecret,
    getAdminData,
    getTodos,
    addTodo,
    deleteTodo
} from "../controllers/userControllers.js";
import {
    authenticateToken,
    authorizeAdmin,
} from "../middleware/authMiddle.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/api/secret", authenticateToken, getSecret);
router.get("/admin/data", authenticateToken, authorizeAdmin, getAdminData);

router.get("/api/todos", authenticateToken, getTodos);
router.post("/api/todos", authenticateToken, addTodo);
router.delete("/api/todos/:id", authenticateToken, deleteTodo);

export default router;
