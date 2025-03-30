import axios from 'axios';

const verify = async(token , res )=>{

    try{
        const res = await axios.post("/verifyToken", { data : token });

        return res.data.decode._id;
    }
    catch(err){
        return err
    }
}

export default verify;