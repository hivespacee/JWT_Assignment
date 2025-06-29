import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "../users.js";

const JWT_SECRET = "your_secret_key";
const todos = [];

export const register = async (req, res) => {
    const { username, password, role } = req.body;

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
        role: role || "user",
    };

    users.push(newUser);
    res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
        sub: user.id,
        name: user.username,
        role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.json({ accessToken: token });
};

export const getSecret = (req, res) => {
    res.json({
        message: `Welcome ${req.user.name}`,
        userdata: req.user,
    });
};

export const getAdminData = (req, res) => {
    res.json({
        message: "Welcome to admin panel",
        secretdata: "This is top-secret admin information",
    });
};

export const getTodos = (req, res) => {
    const userTodos = todos.filter((t) => t.userID === req.user.sub);
    res.json(userTodos);
};

export const addTodo = (req, res) => {
    const { task } = req.body;
    const newTodo = {
        id: todos.length + 1,
        task,
        userID: req.user.sub,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
};

export const deleteTodo = (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const index = todos.findIndex(
        (t) => t.id === todoId && t.userID === req.user.sub
    );
    if (index === -1) {
        return res.status(403).json({ message: "Delete only available todos" });
    }
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
};
