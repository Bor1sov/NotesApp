const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const PORT = 3005;
const {
  addNote,
  getNotes,
  removeNotes,
  updateNote,
} = require("./notes.controller");
const path = require("path");
const { error } = require("console");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Express app",
    error: undefined,
  });
});

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: true,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(req.body.title);
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.render("index", {
      title: "Express app",
      notes: await getNotes(),
      error: true,
      created: false,
    });
  }
});

app.delete("/:id", async (req, res) => {
  await removeNotes(req.params.id);
  res.render("index", {
    title: "Express app",
    notes: await getNotes(),
    created: false,
    error: false,
  });
});
app.put("/:id", async (req, res) => {
  try {
    await updateNote(req.params.id, req.body.title);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Ошибка при обновлении заметки" });
  }
});

mongoose
  .connect(
    "mongodb+srv://dddelymodev:NPSXhpxRZPGiUtBS@cluster0.1nd13xl.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started.... port:${PORT}`));
    });
  });
