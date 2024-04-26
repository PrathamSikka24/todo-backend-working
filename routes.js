const express = require("express");
const router = express.Router();
const db = require("./db");
const authorization = require("./authorization");

const checkTodoExistAndGet = (id) => {
  const getTodo = db.todos.find((item) => item.id === Number(id));
  if (!getTodo) throw new Error("Todo doesn't exist");
  return getTodo;
};

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    const { name } = req.headers;

    await authorization(name, "create", req.body);

    const newData = {
      id: Math.floor(Math.random() * 999999 + 1),
      title,
      flagged: false,
    };
    db.todos.push(newData);

    res.status(201).json({
      code: 201,
      data: newData,
      message: "Todo created successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const getTodos = db.todos.filter((item) => item.flagged === false);

    const { name } = req.headers;
    await authorization(name, "view:all");

    res.json({
      code: 200,
      data: getTodos,
      message: "All todos fetched successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const getTodo = db.todos.find(
      (item) => item.flagged === false && item.id === Number(req.params.id)
    );

    const { name } = req.headers;
    await authorization(name, "view:single");

    res.json({
      code: 200,
      data: getTodo,
      message: "todo fetched successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { title } = req.body;
    let updatedContent = { title };
    const { name } = req.headers;

    const todoId = req.params.id;
    checkTodoExistAndGet(todoId);

    const tempUpdatedTodos = db.todos.map((item) => {
      if (item.id === Number(todoId)) {
        updatedContent = {
          ...item,
          ...updatedContent,
        };
        return updatedContent;
      }
      return item;
    });

    await authorization(name, "update", updatedContent);

    db.todos = tempUpdatedTodos;

    res.json({
      code: 200,
      data: updatedContent,
      message: "todo updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { name } = req.headers;
    const todoId = req.params.id;
    const todo = checkTodoExistAndGet(todoId);

    const allTodos = db.todos.filter(
      (item) => item.flagged === false && item.id !== Number(todoId)
    );

    await authorization(name, "delete", todo);

    db.todos = allTodos;

    res.json({
      code: 200,
      message: "todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/flag/:id", async (req, res, next) => {
  try {
    let flaggedContent = {
      flagged: req.body.flag,
    };
    const { name } = req.headers;

    const todoId = req.params.id;
    checkTodoExistAndGet(todoId);

    const tempUpdatedTodos = db.todos.map((item) => {
      if (item.id === Number(todoId)) {
        flaggedContent = {
          ...item,
          ...flaggedContent,
        };
        return flaggedContent;
      }
      return item;
    });

    await authorization(name, "flag", flaggedContent);

    db.todos = tempUpdatedTodos;

    res.json({
      code: 200,
      data: flaggedContent,
      message: `todo ${req.body.flag ? "flagged" : "unflagged"} successfully`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
