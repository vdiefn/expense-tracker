const express= require('express')
const router = express.Router()
const Expense = require('../../models/expense')

//新增
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  return Expense.create({ name, date, category, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//修改
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Expense.findOne({_id, userId})
    .lean()
    .then((expense) => res.render('edit', { expense }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  return Expense.findOne({_id, userId})
    .then(expense => {
      expense.name = name
      expense.date = date
      expense.category = category
      expense.amount = amount
      return expense.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({_id, userId})
    .then(expense => expense.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router