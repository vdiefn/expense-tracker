const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

//搜尋
router.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim()
  Expense.find()
    .lean()
    .then(expenses => {
      const searchResult = expenses.filter(expense => {
        return expense.name.toLowerCase().includes(keyword.toLowerCase()) ||
          expense.category.toLowerCase().includes(keyword.toLowerCase()) ||
          expense.date.toLowerCase().includes(keyword.toLowerCase())
        // expense.amount.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { expenses: searchResult, keywords })
    })
    .catch(error => console.log(error))
})

//瀏覽首頁
router.get('/', (req, res) => {
  Expense.find()
    .lean()
    .then(expenses => res.render('index', { expenses }))
    .catch(error => console.log(error))
})

module.exports = router