import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {

  const { selectedConversation } =  useConversation()
  const { AuthUser } = useAuthContext()
  const fromMe = message.senderId === AuthUser._id
  const FormattedTime = extractTime(message.createdAt)
  const chatclassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? AuthUser.profilePic : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-blue-700' : ''

  return (

    <div className={`chat ${chatclassName}`} >
       <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
               <img 
               alt="Tailwind css chat bubble component" 
               src= {profilePic} />
            </div>
       </div>
       <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
       <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{FormattedTime}</div>
    </div>
  )
}

export default Message
