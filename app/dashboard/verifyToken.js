import axios from 'axios';

const verify = async(tok)=>{
    try{
        const res = await axios.post("/api/verifyToken", { data : tok });
        return res;
    }
    catch(err){
        return err
    }
}

export default verify;
