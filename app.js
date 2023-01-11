const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Expense = require('./models/expense')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express()
const port = 3000
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))

//新增
app.get('/expenses/new', (req, res) => {
  return res.render('new')
})

app.post('/expenses', (req, res) => {
  const {name, date, category, amount} = req.body
  return Expense.create( { name, date, category, amount})
    .then( () => res.redirect('/'))
    .catch( error => console.log(error))
})


//瀏覽首頁
app.get('/', (req, res) => {
  Expense.find()
  .lean()
    .then(expenses => res.render('index', { expenses }))
  .catch(error => console.log(error))
})

app.get('/', (req, res) => {
  res.render('index')
})

//修改
app.get('/expenses/:id/edit', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .lean()
    .then((expense) => res.render('edit', {expense}))
    .catch(error => console.log(error))
})
app.post('/expenses/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount} = req.body
  return Expense.findById(id)
    .then( expense => {
      expense.name = name
      expense.date = date
      expense.category = category
      expense.amount = amount
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch( error => console.log(error)) 
})

//刪除
app.post('/expenses/:id/delete', (req, res) => {
  const id = req.params.id
  return Expense.findById(id)
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})