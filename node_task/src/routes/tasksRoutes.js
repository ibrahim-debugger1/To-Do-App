import { Router } from "express";
import checkIdLength from "../middlewares/tasksMiddleware.js";
import { verifyToken } from "../middlewares/authenticationMiddleware.js";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksService.js";

const router = Router();

router.get("/tasks", (req, res) => {
  const posts = getAllTasks(req.db);
  posts.then((result) => {
    res.send(result);
  });
});

router.get("/tasks/:id", checkIdLength, (req, res) => {
  const post = getTask(req.db, req.params.id);
  post.then((result) => {
    res.send(result);
  });
});

router.post("/tasks", verifyToken, (req, res) => {
  const post = createTask(req.db, req.body);
  post.then((result) => {
    res.send(result);
  });
});

router.put("/tasks/:id", verifyToken, (req, res) => {
  req.body.id = req.params.id;
  const post = updateTask(req.db, req.body);
  post.then((result) => {
    res.send(result);
  });
});

router.delete("/tasks/:id", verifyToken, (req, res) => {
  const post = deleteTask(req.db, req.params.id);
  post.then((result) => {
    res.send(result);
  });
});

export default router;
