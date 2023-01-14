const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Expense = require('./models/expense')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express()
const port = process.env.PORT


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
//呼叫passport函式並傳入app，這要寫在路由之前
usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)



//搜尋
// app.get('/search', (req, res) => {
//   const keywords = req.query.keywords
//   const keyword = req.query.keywords.trim()
//   Expense.find()
//     .lean()
//     .then(expenses => {
//       const searchResult = expenses.filter(expense => {
//         return expense.name.toLowerCase().includes(keyword.toLowerCase()) ||
//           expense.category.toLowerCase().includes(keyword.toLowerCase()) ||
//           expense.date.toLowerCase().includes(keyword.toLowerCase())
//           // expense.amount.toLowerCase().includes(keyword.toLowerCase())
//       })
//     res.render('index', { expenses: searchResult, keywords})
//     })
//     .catch(error => console.log(error))
// })

//新增
// app.get('/expenses/new', (req, res) => {
//   return res.render('new')
// })

// app.post('/expenses', (req, res) => {
//   const {name, date, category, amount} = req.body
//   return Expense.create( { name, date, category, amount})
//     .then( () => res.redirect('/'))
//     .catch( error => console.log(error))
// })


//瀏覽首頁
// app.get('/', (req, res) => {
//   Expense.find()
//   .lean()
//     .then(expenses => res.render('index', { expenses }))
//   .catch(error => console.log(error))
// })

//缺篩選功能
// app.get('/', (req, res) => {
//   const filter = req.query.filter
//   console.log(filter)
  // if (filter) {
  //   Expense.find({ category: filter })
  //     .lean()
  //     .then(expenses => res.render('index', { expenses }))
  //     .catch(error => console.log(error))
  // } else {
  //   Expense.find()
  //     .lean()
  //     .then(expenses => res.render('index', { expenses }))
  //     .catch(error => console.log(error))
  // }
// })

//修改
// app.get('/expenses/:id/edit', (req, res) => {
//   const id = req.params.id
//   const value = select()
//   return Expense.findById(id)
//     .lean()
//     .then((expense) => res.render('edit', {expense}))
//     .catch(error => console.log(error))
// })
// app.post('/expenses/:id/edit', (req, res) => {
//   const id = req.params.id
//   const { name, date, category, amount} = req.body
  
//   return Expense.findById(id)
//     .then( expense => {
//       expense.name = name
//       expense.date = date
//       expense.category = category
//       expense.amount = amount
//       return expense.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch( error => console.log(error)) 
// })

//刪除
// app.post('/expenses/:id/delete', (req, res) => {
//   const id = req.params.id
//   return Expense.findById(id)
//     .then(expense => expense.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})