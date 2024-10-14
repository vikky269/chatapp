import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useLogOut from '../../hooks/useLogOut';

const LogOutButton = () => {

  const {loading, logout} = useLogOut()
  return (
    <div className='mt-auto'>
      <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout}  />
    
    </div>
  )
}

export default LogOutButton
