import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'


import connectToMongodb from "./db/connectToMongodb.js"

const app = express()
const PORT = process.env.PORT || 3000

dotenv.config()


// app.get('/', (req, res)=> {
//    res.send("Hello worldd!!!")
// })

app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)

app.listen(PORT, ()=> {
    connectToMongodb()
    console.log(`App running on port ${PORT}`)
}
) 