import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { useState } from 'react'

const useLogOut = () => {

    const [loading, setLoading] = useState(false)

    const {AuthUser, setAuthUser} = useAuthContext()

    const logout = async () => {

       setLoading(true)

          try {
            const response = await axios.post("http://localhost:3000/api/auth/logout")
            const data = response.data
            toast.success(data.message)
            console.log(data)

            //remove user from local storage
            localStorage.removeItem("chat-user")

            //setContext
            setAuthUser(null)

          } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
          }
          finally{
            setLoading(false)
          }
    }

 return {loading, logout}
}

export default useLogOut
