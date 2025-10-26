import { api } from "@/api";
import { APIResponse } from "@/api";
import { HistoryType } from "./type";


export const getHistory = async () => {
    try {
        const res = await api.get<APIResponse<HistoryType[]>>("/history")
        if (res.data.success) {
            return res.data.data
        } else {
            return []
        }
    } catch (e) {
        console.log("error:", e)
        return []
    }
}

export const getHistoryById = async (historyId: string) => {
    try {
        const res = await api.get<APIResponse<HistoryType>>(`/history/${historyId}`)
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