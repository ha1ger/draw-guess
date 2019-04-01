var sqlMap = {
  user: {
    add: 'insert into user(username,password) values (?, ?)',
    login: 'SELECT * FROM user WHERE username = ? AND password = ?'
  },
  room: {
    createRoom: 'insert into room (roomID,roomPassword) values (?,?)',
    joinRoom: 'SELECT * FROM room WHERE roomID = ? AND roomPassword = ? ',
    changePlayer: 'update room set player = ? where roomID = ?',
    deleteRoom: 'DELETE FROM room WHERE roomID = ?',
    beginGame: 'update room set onGaming=1 where roomID = ?',
    endGame: 'update room set onGaming=0 where roomID = ?',
    outRoom: 'SELECT * FROM room WHERE roomID = ?'
  },
  game: {
    getGuess: 'SELECT * FROM guess ORDER BY RAND() LIMIT ?'
  }
}

module.exports = sqlMap
