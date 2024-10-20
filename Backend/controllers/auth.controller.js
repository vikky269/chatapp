import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const Signup = async (req, res) => {
    try {

        console.log("Request body:", req.body)

        const { fullname, username, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) {
            return res.status(401).json({ error: "Passwords do not match" })
        }

        const user = await User.findOne({ username })
        if (user) {
            return res.status(401).json({ error: "Username already exists" })
        }

        const userfullname = await User.findOne({ fullname })
        if (userfullname) {
            return res.status(401).json({ error: "User with this name already exists" })
        }

        //HASH PASSWORD HERE

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        


        const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyprofilePic : girlprofilePic
        })

       if(newUser){

        //GENERATE JWT TOKEN HERE
        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
       }else{
          res.status(400).json({error: "Invalid user data"})
       }



    } catch (error) {
      console.log("Error in Signup controller", error.message)
      res.status(500).json({error:"Internal Server Error"})
    }
}


export const login =  async (req, res)=> {
   try {
    const { username, password} = req.body

    const user = await User.findOne({username})

    if(!user){
        return  res.status(400).json({ error: "Invalid Username or password"})
      }

    const ispasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if (!ispasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

  generateTokenAndSetCookie(user._id , res)

    return res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic
    })

   } catch (error) {
    console.log("Error in login controller", error.message)
    res.status(500).json({error:"Internal Server Error"})
   }
}

export const logout = (req, res)=> {
   try {
    res.cookie("jwt", "", {maxAge:0})
    return res.status(200).json({message:"Logged Out Sucessfully"})
   } catch (error) {
    console.log("Error in logout controller", error.message)
    res.status(500).json({error:"Internal Server Error"})
   }
}

