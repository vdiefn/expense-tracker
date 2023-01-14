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
  //處理多個 flash message
  const errors = []
  if(!name || !email || !password || !confirmPassword){
    errors.push({message: '所有欄位都是必填的！'})
  }
  if(password !== confirmPassword){
    errors.push({message: '密碼與確認密碼不相符！'})
  }
  if(errors.length){
    return res.render('register', {
      errors,
      name,
      email,
      password
    })
  }
  User.findOne({email})
    .then((user) => {
      if(user){
        errors.push({message: '這個Email已經被註冊過了！'})
        res.render('register', {name, email, password})
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
  //成功訊息：你已經成功登出
  req.flash('success_msg', '你已經成功登出！')
  res.redirect('/users/login')
})

module.exports = router