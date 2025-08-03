const express = require('express')
const chalk = require('chalk');
const PORT =3005;
const {addNote, getNotes, removeNotes,updateNote} = require('./notes.controller')
const path = require('path')

const app = express()
app.use(express.json());
app.set('view engine', 'ejs')
app.set('views','pages')


app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.urlencoded({
  extended:true
}))


app.get('/',async(req,res)=>{
  res.render('index',{
    title:'Express app',
    notes:await getNotes(),
    created:true
  })
});

app.post('/',async(req,res)=>{
  await addNote(req.body.title)
  res.redirect('/');
});

app.delete('/:id',async(req,res)=>{
  await removeNotes(req.params.id)
  res.render('index',{
    title:'Express app',
    notes:await getNotes(),
    created:false
  })
})
app.put('/:id', async (req, res) => {
  try {
    await updateNote(req.params.id, req.body.title);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Ошибка при обновлении заметки' });
  }
});
app.listen(PORT,()=>{
  console.log(chalk.green(`Server has been started.... port:${PORT}`))
});
