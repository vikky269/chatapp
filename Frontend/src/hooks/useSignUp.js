import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuthContext } from "../context/AuthContext"


const useSignUp = () => {

    const [loading, setLoading] = useState(false)

    const { AuthUser, setAuthUser} = useAuthContext()

    const signUp = async ({ fullname, username, password, confirmPassword, gender }) => {

      

        const success = handleInputErrors({ fullname, username, password, confirmPassword, gender })
        if (!success) return

        setLoading(true)
        try {
            const response = await axios.post("http://localhost:3000/api/auth/Signup", {
                fullname, username, password, confirmPassword, gender
            })
            const data = response.data
            console.log(data)
            toast.success("Signup successful")


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

    return { loading, signUp }
}

export default useSignUp


function handleInputErrors({ fullname, username, password, confirmPassword, gender }) {

    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return false
    }

    if (password.length < 8) {
        toast.error("Password must be at least 8 characters")
        return false
    }

    return true
}