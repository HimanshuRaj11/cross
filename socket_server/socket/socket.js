import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

const userSocketMap = {} //map to user._id
const getResiverSocket = (resiverId) => userSocketMap[resiverId]

io.on('connection', (socket) => {
    socket.on("User", (userId) => {
        if (userId) {
            userSocketMap[userId] = socket.id
            console.log(`user:${userId}, socket: ${socket.id}`);
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
        socket.on("disconnect", () => {
            if (userId) {
                delete userSocketMap[userId];
            }
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        })
    })
    // const userId = socket.handshake.query.userId;

})

export { app, server, io, getResiverSocket }