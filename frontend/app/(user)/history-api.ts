import { api } from "@/api";
import { APIResponse } from "@/api";

export const getHistory = async () => {
    try {
        const res = await api.get<APIResponse<any[]>>("/history")
        if (res.data.success) {
            return res.data.data
        } else {
            return null
        }
    } catch (e) {
        console.log("error:", e)
        return null
    }
}

export const getHistoryById = async (historyId: string) => {
    try {
        const res = await api.get<APIResponse<any>>(`/history/${historyId}`)
        if (res.data.success) {
            return res.data.data
        } else {
            return null
        }
    } catch (e) {
        console.log("error:", e)
        return null
    }
}