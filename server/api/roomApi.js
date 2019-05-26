var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = (res, ret) => {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 创建房间
router.post('/createRoom', (req, res) => {
  let sql = $sql.room.createRoom
  let params = req.body
  conn.query(sql, [params.roomID, params.roomPassword], (err, result) => {
    if (err) {
      jsonWrite(res, err)
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 加入房间
router.post('/joinRoom', (req, res) => {
  let sql = $sql.room.joinRoom
  let params = req.body
  conn.query(sql, [params.roomID, params.roomPassword], (err, result) => {
    if (err) {
      jsonWrite(res, err)
      console.log(err)
    }
    if (result) {
      if (result[0]) {
        if (result[0].onGaming === 1) {
          console.log('正在游戏')
        }
        if (result[0].player >= 6) {
          console.log('该房间人数已满')
        }
      }
      jsonWrite(res, result)
    }
  })
})

module.exports = router
