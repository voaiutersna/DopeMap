import { api } from "@/api";
import { APIResponse } from "@/api";

export const getMe = async() => {
    try {
        console.log("Test")
        const res = await api.get<APIResponse<any>>("/me")
        console.log("res : " , res)
        if (res.data.success){
            console.log(res.data.data)
            return res.data.data
        }else{
            return null
        }

    }catch(e){
        console.log("error:" , e)
        return null
    }
}
