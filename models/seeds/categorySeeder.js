const mongoose = require('mongoose')
const Category = require('../category')
const db = require('../../config/mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const categoryList = [
  {
    id: 1,
    name: '家居物業'
  },
  {
    id: 2,
    name: '交通出行'
  },
  {
    id: 3,
    name: '休閒娛樂'
  },
  {
    id: 4,
    name: '餐飲食品'
  },
  {
    id: 5,
    name: '其他'
  }
]


db.once('open', () => {
  console.log('mongodb connected')
  return Promise.all(Array.from(
    { length: 5},
    (_, i) => Category.create({id: categoryList[i].id, name:categoryList[i].name})
  ))
  .then(() => {
    console.log('category seeder done!')
    process.exit()
  })
})