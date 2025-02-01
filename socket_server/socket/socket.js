import dotenv from "dotenv"
dotenv.config()
import { Server } from 'socket.io'
import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URI,
        methods: ["GET", "POST"]
    }
})

const userSocketMap = {}
const getResiverSocket = (resiverId) => userSocketMap[resiverId]

io.on('connection', (socket) => {
    socket.on("User", (userId) => {
        if (userId) {
            userSocketMap[userId] = socket.id

        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
        socket.on("join-room", (room) => {
            socket.join(room);
        });
        socket.on("message", ({ message, chat_id }) => {
            socket.to(chat_id).emit("receive-message", message);
        })

        socket.on("disconnect", () => {
            if (userId) {
                delete userSocketMap[userId];
            }
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        })
    })


})

export { app, server, io, getResiverSocket }