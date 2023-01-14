module.exports = {
  authenticator: (req, res, next) => {
    if(req.isAuthenticated()){
      return next()
    }
    //警告訊息：未登入不能使用網站
    req.flash('warning_msg', '請先登入才能使用。')
    res.redirect('/users/login')
  }
}
