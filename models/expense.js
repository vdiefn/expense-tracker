const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
  name:{
    type: String,
    require:true
  },
  date:{
    type: String,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Expense', expenseSchema)