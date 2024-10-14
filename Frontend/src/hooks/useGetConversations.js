import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const useGetConversations = () => {

 const [loading, setLoading] = useState(false)
 const [conversations, setconversations] = useState([])


    useEffect(() => {
        const getConversations = async () => {
            
            setLoading(true)
            try {
                const res = await axios.get("http://localhost:3000/api/users", {
                    withCredentials: true
                })
                const data = res.data
                console.log(data)

                if (data.error) {
                    throw new Error(data.error)
                }
                setconversations(data)
                
            } catch (error) {
                
                toast.error(error.response.data.error)
            }
            finally {
                setLoading(false)
            }
        }

        getConversations()
    }, [])

  return {loading, conversations}

}

export default useGetConversations
