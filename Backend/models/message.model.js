import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type:String,
        required:true
    }
}, {timestamps:true}) //they tell us the exact time a message was created and updated at.


const Message  =  mongoose.model("Message", messageSchema)

export default Message