import { api } from "@/api";
import { APIResponse } from "@/api";
import { User } from "./type";

export const getMe = async() => {
    try {
        const res = await api.get<APIResponse<User>>("/me")
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
