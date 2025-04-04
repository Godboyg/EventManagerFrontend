import axios from 'axios';

const verify = async(tok)=>{
    try{
        const res = await axios.post("/api/verifyToken", { data : tok });
        return res;
    }
    catch(error){
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

export default verify;
