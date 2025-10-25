import { api } from "@/api";
import { APIResponse } from "@/api";

export const getRoadmaps = async () => {
    try {
        const res = await api.get<APIResponse<any[]>>("/roadmaps")
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

export const getRoadmapById = async (roadmapId: string) => {
    try {
        const res = await api.get<APIResponse<any>>(`/roadmaps/${roadmapId}`)
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
