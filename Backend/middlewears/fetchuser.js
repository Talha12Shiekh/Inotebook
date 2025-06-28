const jwt = require("jsonwebtoken");

const SECRET_KEY = "codertk";

const fetchUser = (req,res,next) => {

    try {

        const token = req.header("auth-token");

        if(!token){
            res.status(401).send({error:"Please autenticate using a valid token"});
        }

        const data = jwt.verify(token,SECRET_KEY);
        
        req.verifiedid = data.id; 

    } catch (error) {
        console.error(error.message);
        res.status(401).send({error:"Please autenticate using a valid token"});
    }

    next();
}


module.exports = fetchUser;