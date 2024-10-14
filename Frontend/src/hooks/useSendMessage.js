import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import axios from 'axios'

const useSendMessage = () => {

    const [loading, setloading] = useState(false)

    const { messages, setMessages, selectedConversation } = useConversation()

    const sendMessage = async (message) => {

        axios.defaults.withCredentials = true;

        setloading(true)

        try {

            const res = await axios.post(`http://localhost:3000/api/messages/send/${selectedConversation._id}`, { message })
            const data = res.data.newMessage

            console.log("Message Sent", data.newMessage)

            if (data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages, data])

        } catch (error) {
            toast.error(error.message)
        }

        finally {
            setloading(false)
        }

    }

    return { sendMessage, loading }

}

export default useSendMessage
