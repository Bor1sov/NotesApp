const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgBlue("Hello world!"));
}
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.green(note.id,note.title));
  });
}
async function removeNotes(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter(note => note.id !== String(id));
  if (filteredNotes.length < notes.length) {
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    console.log(chalk.green(`Note with id ${id} was removed!`));
  } else {
    console.log(chalk.red(`Note with id ${id} not found!`));
  }
}
async function updateNote(id, title) {
  const notes = await getNotes();
  const index = notes.findIndex(n => n.id === String(id));
  
  if (index === -1) {
    throw new Error('Заметка не найдена');
  }

  notes[index].title = title;
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green(`Заметка с id ${id} обновлена`));
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNotes,
  updateNote
};
