

import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import socketio from 'socket.io'
import votes from './models'
import api from './api'
import { incrementVote } from './lib'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 8082


mongoose.connect('mongodb://localhost/tvify')

app.use(express.static('public'))

app.use('/api/', api)

io.on('connection', (socket) => {
  console.log(`connected ${socket.id}`)

  socket.on('vote', id => {
    incrementVote(id, (err, vote) => {
      if (err) return socket.emit('vete:error', err)

      io.sockets.emit('vote:done', vote)
    })
  })

  socket.on('join', room => {
    socket.room = room
    socket.join(room)
  })

  socket.on('message', msg => {
    console.log(msg)
    socket.broadcast.to(socket.room).emit('message', msg)
  })
})

server.listen(port, () => console.log(`Corriendo en el puerto ${port}`))
