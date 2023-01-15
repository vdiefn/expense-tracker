const express= require('express')
const router = express.Router()
const Expense = require('../../models/expense')

//新增
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  return Expense.create({ name, date, amount, category, userId })
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
  const { name, date, amount, category } = req.body
  return Expense.findOne({_id, userId})
    .then(expense => {
      expense.name = name
      expense.date = date
      expense.amount = amount
      expense.category = category
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