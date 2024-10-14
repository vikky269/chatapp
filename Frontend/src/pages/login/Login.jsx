import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useLogin from '../../hooks/useLogin'

const Login = () => {


  const {loading,  login}  = useLogin()

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

   const handleLoginSubmit = async (e)=> {
    e.preventDefault()
   await login(loginData.username, loginData.password)
   }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'> 
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
         <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
         <span className='text-blue-950'>  ChatApp</span>
         </h1>
        
          
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
              value={loginData.username}
              onChange={(e)=>setLoginData({...loginData, username: e.target.value})}
						/>
          </div>


          <div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
              value={loginData.password}
              onChange={(e)=> setLoginData({...loginData, password: e.target.value})}
						/>
					</div>

        <div>
            <button className='btn btn-block btn-sm mt-5'
            disabled={loading}
            >
            {loading ? <span className='loading loading-spinner'></span> : "Login"}
            </button>
        </div>

          <span className='text-sm inline-block mt-5'>
            {"Don't"} have an account? 
             <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 ml-5'>Signup</Link>
            </span>
        </form>
      </div>
    </div>
  )
}

export default Login
