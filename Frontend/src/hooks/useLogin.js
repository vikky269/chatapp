import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"


const useLogin = () => {


    const [loading, setLoading] = useState(false)

    const { setAuthUser } = useAuthContext()

    const login = async (username, password) => {

        axios.defaults.withCredentials = true;

      const success = handleInputErrors({ username, password })
            if (!success) return


            setLoading(true)

            try {
                const response = await axios.post("http://localhost:3000/api/auth/login", { username, password })
                const data = response.data
                console.log(data)
                if (data) {
                    toast.success("Login successful")
                }

                if (data.error) {
                    throw new Error(data.error)
                }

                //localstorage
                localStorage.setItem("chat-user", JSON.stringify(data))

                //context
                setAuthUser(data)

            } catch (error) {
                console.log(error)
                toast.error(error.response.data.error)
            }
            finally {
                setLoading(false)
            }
        }

        return { loading, login }
    }



export default useLogin



function handleInputErrors({ username, password }) {

    if (!username || !password) {
        toast.error("Please fill in all fields")
        return false
    }

    if (password.length < 8) {
        toast.error("Password must be at least 8 characters")
        return false
    }

    return true
}