import jwt from 'jsonwebtoken'



 const generateTokenAndSetCookie =  (userId, res)=>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })

  console.log(token)
 
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true,  // Prevent XSS attacks
    sameSite: "lax", // Allows cookies within the same site (works fine for development)
    secure: false    // Since you're using HTTP and not HTTPS in development
  });
  
}


export default generateTokenAndSetCookie