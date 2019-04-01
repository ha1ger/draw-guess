var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 注册用户
router.post('/addUser', (req, res) => {
  let sql = $sql.user.add
  let params = req.body
  console.log(params)
  conn.query(sql, [params.username, params.password], (err, result) => {
    if (err) {
      jsonWrite(res, err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 登录验证
router.post('/login', (req, res) => {
  let sql = $sql.user.login
  let params = req.body
  console.log(params)
  conn.query(sql, [params.username, params.password], (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router
