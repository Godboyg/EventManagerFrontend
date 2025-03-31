import axios from 'axios';

const verify = async(token)=>{

    try{
        const res = await axios.post("/api/verifyToken", { data : token });
        return res.data.decode._id;
    }
    catch(err){
        return err
    }
}

export default verify;