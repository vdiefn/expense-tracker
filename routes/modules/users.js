const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

//登入頁
router.get('/login', (req, res) => {
  res.render('login')
})
// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/users/login'
}))


//註冊頁
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  User.findOne({email})
    .then((user) => {
      if(user){
        console.log('user already exist!')
        res.render('register', {name, email, password, confirmPassword})
      } else {
        return User.create({name, email, password})
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
      }
    })
})



//登出頁
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router