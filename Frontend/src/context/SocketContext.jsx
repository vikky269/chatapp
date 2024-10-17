import { createContext, useState, useEffect } from "react"
import { useAuthContext } from "./AuthContext"
import io from "socket.io-client"

export const socketContext = createContext()


export const socketContextProvider = ({children}) => {
    
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {AuthUser} = useAuthContext()

    useEffect(()=> {
       if(AuthUser){
        const socket = io("http://localhost:3000", {
            query:{
                userId: AuthUser._id
            }
        }) 

        setSocket(socket)

        return ()=> socket.close()
       } else{
        if(socket){
            socket.close()
            setSocket(null)
        }
       }
    }, [])

     return (
          <socketContext.Provider value={{socket, onlineUsers}}> 
               {children}
          </socketContext.Provider>
     )
}