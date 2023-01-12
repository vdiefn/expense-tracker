const mongoose = require('mongoose')
const Expense = require('../expense')
const db = require('../../config/mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


const demoExpense = {
  "result" : [
    { 
      "name":"午餐",
      "date":"2019/04/23",
      "amount":60,
      "category":"餐飲食品"
    },
    {
      "name":"晚餐",
      "date":"2019/04/23",
      "amount":60,
      "category": "餐飲食品"
    },
    {
      "name":"捷運",
      "date":"2019/04/23",
      "amount":120,
      "category":"交通出行"
    },
    {
      "name":"電影：驚奇隊長",
      "date":"2019/04/23",
      "amount":220,
      "category":"休閒娛樂"
    },
    {
      "name":"租金",
      "date":"2019/04/01",
      "amount":25000,
      "category":"家居物業"
    }
  ]
}

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb is connecting!')
  Expense.create(demoExpense.result)
  .then(() => {
    console.log('Demo seeder done!')
  })
  .catch(error => console.log(error))
})