const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/facebook', passport.authenticate('facebook', {
  authType: 'reauthenticate',
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successredirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router