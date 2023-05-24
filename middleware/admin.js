const admin = async(req,res,next)=>{
    try{
        const role = req.user.role;
        if(role === "admin"){
            next()
        }
        else{
            return res.status(401).json({error:"Access Denied"})
        }
    }
    catch(err){
        res.status(500).json({error:err.messsage})
    }
}

module.exports = admin