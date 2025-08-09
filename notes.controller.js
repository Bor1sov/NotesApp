const chalk = require("chalk");
const Note = require('./models/note')

async function addNote(title) {
  await Note.create({title})
  console.log(chalk.bgBlue("Hello world!"));
}
async function getNotes() {
  const notes = await Note.find();
  return notes;
}
async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.green(note.id,note.title));
  });
}
async function removeNotes(id) {
  await Note.deleteOne({_id:id})
}
async function updateNote(id, title) {
  await Note.updateOne({_id:id},{title})
  console.log(chalk.green(`Заметка с id ${id} обновлена`));
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  removeNotes,
  updateNote
};
