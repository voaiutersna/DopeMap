import { api } from "@/api";
import { APIResponse } from "@/api";

export const getMe = async() => {
    try {
        const res = await api.get<APIResponse<any>>("/me")
        if (res.data.success){
            return res.data.data
        }else{
            return null
        }

    }catch(e){
        console.log("error:" , e)
        return null
    }
}
