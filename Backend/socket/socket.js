import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:[" http://localhost:5173/"],
        methods:["GET", "POST"]
    }
})

const userSocketMap = {}; //{userId:socketId}




io.on('connection', (socket) => { 
    console.log('New client connected', socket.id) 


    const userId = socket.handshake.query.userId
    if(userId !== "undefined") userSocketMap[userId] = socket.id
     od//
    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })

    
})  





export {app, io, server}