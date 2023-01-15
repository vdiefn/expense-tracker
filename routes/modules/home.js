const express = require('express')
const category = require('../../models/category')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

//計算總金額
function total(records) {
  let total = 0
  records.map((record) => {
    total = total + record.amount
  })
  return total
}

//搜尋
router.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim()
  let totalAmount = 0
  const userId = req.user._id
  Expense.find({userId})
    .lean()
    .then(expenses => {
      const searchResult = expenses.filter(expense => {
        return expense.name.toLowerCase().includes(keyword.toLowerCase()) ||
          expense.category.toLowerCase().includes(keyword.toLowerCase()) ||
          expense.date.toLowerCase().includes(keyword.toLowerCase())
      })
      totalAmount = total(searchResult)
      res.render('index', { expenses: searchResult, keywords, totalAmount })
    })
    .catch(error => console.log(error))
})

//瀏覽首頁
router.get('/', (req, res) => {
  let totalAmount = 0
  const userId = req.user._id
  Expense.find({userId})
    .lean()
    .then(expenses =>{
      totalAmount = total(expenses)
    return res.render('index', {expenses, totalAmount}) 
    }) 
    .catch(error => console.log(error))
})

module.exports = router