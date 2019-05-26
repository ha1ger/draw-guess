const userApi = require('./api/userApi')
const roomApi = require('./api/roomApi')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const models = require('./db')
const mysql = require('mysql')
const $sql = require('./sqlMap')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 数据库连接
var conn = mysql.createConnection(models.mysql)
conn.connect()
// 后端api路由
app.use('/api/user', userApi)
app.use('/api/room', roomApi)

var roomInfo = {}
var prop = []
var guessname = []
var socreDrawer = []

io.on('connection', socket => {
  var beginFlag = false
  var user = ''
  var roomID = ''
  var roomOwner = ''
  var drawer = ''
  var fame = []
  var guesstip = ''
  var guesslength = ''

  socket.on('getRoom', room => {
    roomID = room
  })
  socket.on('join', username => {
    if (username !== '') {
      user = username
      prop[roomID] = { flower: 0, egg: 0, slipper: 0, heart: 0, six: 0 }
      console.log(roomID)
      // 将用户昵称加入房间名单中
      if (!roomInfo[roomID]) {
        roomInfo[roomID] = []
      }
      roomInfo[roomID].push(user)
      socket.join(roomID) // 加入房间
      let sql = $sql.room.changePlayer
      conn.query(sql, [roomInfo[roomID].length, roomID])
      roomOwner = roomInfo[roomID][0] // 第一个进入房间的人是房主
      io.in(roomID).emit('getRoomOwner', roomOwner)
      // 通知房间内人员
      io.in(roomID).emit('sysMsg', user + '加入了房间')
      console.log(user + '加入了房间' + roomID)
      drawer = roomOwner
      io.in(roomID).emit('getPeople', roomInfo[roomID])
      socket.on('leave', () => {
        socket.emit('disconnect')
      })
      socket.on('disconnect', () => {
        var index = roomInfo[roomID].indexOf(user)
        if (index !== -1) {
          roomInfo[roomID].splice(index, 1)
        } // 从房间名单中移除
        let sql = $sql.room.changePlayer
        let sql2 = $sql.room.deleteRoom
        let sql3 = $sql.room.outRoom
        let gaming = 0
        conn.query(sql, [roomInfo[roomID].length, roomID])
        conn.query(sql3, roomID, (err, result) => {
          if (err) {
            console.log(err)
          }
          if (result[0] !== undefined) {
            gaming = result[0].onGaming
            if (gaming) {
              io.in(roomID).emit('clickReset')
              io.in(roomID).emit('clearTimer')
              io.in(roomID).emit('clearCanvas')
              io.in(roomID).emit('drawerChange', 'end')
              io.in(roomID).emit('gameEnd')
              io.in(roomID).emit('stopGame', roomID)
            } // 如果在游戏中退出房间，清空该房间所有玩家，并清除房间
          }
        })
        if (roomInfo[roomID].length <= 0) {
          conn.query(sql2, roomID) // 如果房间内没有玩家，则清除该房间
        } else {
          io.in(roomID).emit('getPeople', roomInfo[roomID])
          socket.leave(roomID) // 退出房间
          roomOwner = roomInfo[roomID][0] // 房主退出房间后，房主交接给下一个玩家
          io.in(roomID).emit('getRoomOwner', roomOwner)
          drawer = roomOwner
          io.in(roomID).emit('sysMsg', user + '退出了房间')
          console.log(user + '退出了' + roomID)
          beginFlag = false
        }
      })
    }
  })
  // 聊天窗
  socket.on('sendMsg', (msguser, msg) => {
    if (msg === guessname[roomID]) {
      io.in(roomID).emit('guessRight', msguser)
      io.in(roomID).emit('guessRight', socreDrawer[roomID])
      io.in(roomID).emit('getMsg', msguser, '正确答案！', 'green')
      io.in(roomID).emit('stopWrite', msguser)
    } else {
      io.in(roomID).emit('getMsg', msguser, msg, 'black')
    }
  })
  // 换题
  socket.on('changeGuess', drawerName => {
    let sql = $sql.game.getGuess
    conn.query(sql, roomInfo[roomID].length, (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result) {
        guessname[roomID] = result[0].guessName
        guesstip = result[0].guessTip
        guesslength = result[0].guessLength
        io.in(roomID).emit('sendGuess', drawerName, guessname[roomID])
        io.in(roomID).emit('sendLength', guesslength)
        io.in(roomID).emit('sendTip', '')
        io.in(roomID).emit('sysMsg', drawerName + '更换了题目')
        setTimeout(() => {
          io.in(roomID).emit('sendTip', guesstip)
        }, 5000)
      }
    })
  })
  // 开始游戏↓↓↓
  socket.on('beginGame', () => {
    if (roomInfo[roomID].length > 1) {
      io.in(roomID).emit('closeSettlement')
      beginFlag = true
      io.in(roomID).emit('showIn5')
      io.in(roomID).emit('stopWrite', roomInfo[roomID][0])
      let sql = $sql.room.beginGame
      let sql2 = $sql.game.getGuess
      conn.query(sql, roomID)
      conn.query(sql2, roomInfo[roomID].length, (err, result) => {
        if (err) {
          console.log(err)
        }
        if (result) {
          guessname[roomID] = result[0].guessName
          guesstip = result[0].guessTip
          guesslength = result[0].guessLength
          io.in(roomID).emit(
            'sendGuess',
            roomInfo[roomID][0],
            guessname[roomID]
          )
        }
      })
      for (let i = 0; i < roomInfo[roomID].length + 1; i++) {
        ;(() => {
          setTimeout(() => {
            if (beginFlag) {
              if (i >= 1 && i < roomInfo[roomID].length) {
                conn.query(sql2, roomInfo[roomID].length, (err, result) => {
                  if (err) {
                    console.log(err)
                  }
                  if (result) {
                    guessname[roomID] = result[0].guessName
                    guesstip = result[0].guessTip
                    guesslength = result[0].guessLength
                    io.in(roomID).emit(
                      'sendGuess',
                      roomInfo[roomID][i],
                      guessname[roomID]
                    )
                  }
                })
              }
              drawer = roomInfo[roomID][i]
              socreDrawer[roomID] = drawer
              if (i === roomInfo[roomID].length) {
                // 游戏结束
                gameEnd(i)
              } else if (i === 0) {
                // 第一名玩家
                firstDrawer(drawer, i)
              } else {
                // 其余玩家
                nextDrawer(drawer, i)
              }
            }
          }, i * 65000)
        })(i)
      }
    } else {
      console.log('人数不足')
    }
    var firstDrawer = drawer => {
      prop[roomID] = { flower: 0, egg: 0, slipper: 0, heart: 0, six: 0 }
      io.in(roomID).emit('changeProp', prop[roomID])
      io.in(roomID).emit('clickReset')
      io.in(roomID).emit('clearCanvas')
      io.in(roomID).emit('clearTimer')
      io.in(roomID).emit('openWrite', drawer)
      io.in(roomID).emit('stopWrite', drawer)
      setTimeout(() => {
        io.in(roomID).emit('sendLength', guesslength)
        io.in(roomID).emit('timerBegin')
        io.in(roomID).emit('drawColor', roomInfo[roomID])
        io.in(roomID).emit('drawerChange', drawer)
      }, 5000)
      setTimeout(() => {
        io.in(roomID).emit('sendTip', guesstip)
      }, 15000)

      setTimeout(() => {
        io.in(roomID).emit('sysMsg', drawer + '画的题目是' + guessname[roomID])
      }, 64900)
    }
    var nextDrawer = (drawer, i) => {
      io.in(roomID).emit('clearTimer')
      io.in(roomID).emit('clickReset')
      io.in(roomID).emit('showEvaluate')
      io.in(roomID).emit('clearCanvas')
      io.in(roomID).emit('openWrite', drawer)
      io.in(roomID).emit('stopWrite', drawer)
      setTimeout(() => {
        io.in(roomID).emit('sendLength', guesslength)
        io.in(roomID).emit('drawColor', roomInfo[roomID])
        io.in(roomID).emit('drawerChange', drawer)
        io.in(roomID).emit('timerBegin')
        let sfame =
          prop[roomID].flower * 1 +
          prop[roomID].heart * 1 +
          prop[roomID].six * 1 +
          prop[roomID].egg * -1 +
          prop[roomID].slipper * -1
        fame[roomInfo[roomID][i - 1]] = sfame
        io.in(roomID).emit('sendFame', sfame)
        io.in(roomID).emit('sendTip', '')
        prop[roomID] = { flower: 0, egg: 0, slipper: 0, heart: 0, six: 0 }
        io.in(roomID).emit('changeProp', prop[roomID])
      }, 5000)
      setTimeout(() => {
        io.in(roomID).emit('sendTip', guesstip)
      }, 15000)

      setTimeout(() => {
        io.in(roomID).emit('sysMsg', drawer + '画的题目是' + guessname[roomID])
      }, 64900)
    }
    var gameEnd = i => {
      io.in(roomID).emit('clickReset')
      io.in(roomID).emit('showEvaluate')
      io.in(roomID).emit('clearTimer')
      io.in(roomID).emit('clearCanvas')
      io.in(roomID).emit('openWrite', drawer)
      setTimeout(() => {
        io.in(roomID).emit('drawerChange', 'end')
        io.in(roomID).emit('drawColor', roomInfo[roomID])
        let sfame =
          prop[roomID].flower * 1 +
          prop[roomID].heart * 1 +
          prop[roomID].six * 1 +
          prop[roomID].egg * -1 +
          prop[roomID].slipper * -1
        fame[roomInfo[roomID][i - 1]] = sfame
        let sql = $sql.room.endGame
        conn.query(sql, roomID)
        io.in(roomID).emit('sendFame', sfame)
        io.in(roomID).emit('showSettlement')
        io.in(roomID).emit('gameEnd')
        beginFlag = false
      }, 5000)
    }
  })
  // 玩家评价

  socket.on('getProp', getprop => {
    if (getprop.flower) {
      prop[roomID].flower++
    } else if (getprop.egg) {
      prop[roomID].egg++
    } else if (getprop.slipper) {
      prop[roomID].slipper++
    } else if (getprop.heart) {
      prop[roomID].heart++
    } else if (getprop.six) {
      prop[roomID].six++
    }
    io.in(roomID).emit('changeProp', prop[roomID])
  })
  // 画图事件
  socket.on('beginDraw', (startX, startY, lineColor, lineWidth) => {
    io.in(roomID).emit('beginDraw', startX, startY, lineColor, lineWidth)
  })
  socket.on('onDrawing', (canvasX, canvasY) => {
    io.in(roomID).emit('onDrawing', canvasX, canvasY)
  })
  socket.on('endDrawing', () => {
    io.in(roomID).emit('endDrawing')
  })
  // 清空画板
  socket.on('clearC', () => {
    io.in(roomID).emit('clearCanvas')
  })
})

// app.use(express.static(path.resolve(__dirname, './../dist')))
server.listen(3000, () => {
  console.log('success listen at port:3000......')
})
