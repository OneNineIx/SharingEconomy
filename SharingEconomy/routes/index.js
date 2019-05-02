const express = require('express')
const router = express.Router()
const template = require('../lib/template.js')
const kakaoKey = process.argv[2] // key
const myIP = process.argv[3] // IP


router.get('/', function(req,res){
    var html = template.HTML(kakaoKey,myIP)
    res.send(html)
})

module.exports = router
