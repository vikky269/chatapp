import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"


import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'
import { app, server } from "./socket/socket.js"

import connectToMongodb from "./db/connectToMongodb.js"


const PORT = process.env.PORT || 3000

dotenv.config()


// app.get('/', (req, res)=> {
//    res.send("Hello worldd!!!")
// })
//app.use(cors())


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // This allows the cookie to be sent
}));

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)

server.listen(PORT, ()=> {
    connectToMongodb()
    console.log(`App running on port ${PORT}`)
}
) 