const mongoose = require('mongoose')
const Expense = require('../expense')
const db = require('../../config/mongoose')
const User = require('../user')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const SEED_USER = 
  {
  name: '廣志',
  email:'demo@example.com',
  password:'12345678'
  }


const demoExpense= 
 [
    { 
      "name":"午餐",
      "date":"2019-04-23",
      "amount":60,
      "categoryId":"4"
    },
    {
      "name":"晚餐",
      "date":"2019-04-23",
      "amount":60,
      "categoryId": "4"
    },
    {
      "name":"捷運",
      "date":"2019-04-23",
      "amount":120,
      "categoryId":"2"
    },
    {
      "name":"電影：驚奇隊長",
      "date":"2019-04-23",
      "amount":220,
      "categoryId":"3"
    },
    {
      "name":"租金",
      "date":"2019-04-01",
      "amount":25000,
      "categoryId":"1"
    }
  ]


db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({ 
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        {length: 5},
        (_, i) => Expense.create({
          name: demoExpense[i].name,
          date: demoExpense[i].date,
          amount: demoExpense[i].amount,
          category: demoExpense[i].categoryId,
          userId
        })
      ))
    })
  .then(() => {
    console.log('Demo user seeder done!')
    process.exit()
  })
  .catch(error => console.log(error))
})