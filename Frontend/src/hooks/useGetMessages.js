import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import axios from 'axios'

const useGetMessages = () => {
  const [loading, setloading] = useState(false)

  const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(()=>{

        const getMessage = async()=> {
            axios.defaults.withCredentials = true;
            setloading(true)
            try {
               const res = await axios.get(`http://localhost:3000/api/messages/${selectedConversation._id}`)
               const data = res.data
               //console.log(data)
               setMessages(data)
             
               if(data.error){
                throw new Error(data.error)
               } 
            } catch (error) {
                toast.error(error.message)
            }finally{
                setloading(false)
            }      
        }

     if(selectedConversation?._id) getMessage()


    },[selectedConversation?._id, setMessages])    

    return {messages, loading}
}

export default useGetMessages
