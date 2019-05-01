const express = require('express')
const router = express.Router()
const template = require('../lib/template.js')
const kakaoKey = process.argv[2] // key


router.get('/', function(req,res){
    var html = template.HTML(kakaoKey)
    res.send(html)
})

module.exports = router
