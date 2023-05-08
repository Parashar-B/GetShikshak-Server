const jwt = require('jsonwebtoken')

const verifyToken = async(req,res,next)=>{
    try{
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("Access Denied")
        }

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length);
        }
        
       jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err && err.message === "TokenExpiredError") return res.status(403).json({error:'Token Expired'})
            if(err) return res.status(401).json({error:"Invalid token"})
            // console.log(user);            
            // return res.send(user)
            req.user=user;  
            next();
        })
        // console.log("Verified")
    }
    catch(err){
        res.status(500).json({error:err.messsage})
    }
}

module.exports = verifyToken