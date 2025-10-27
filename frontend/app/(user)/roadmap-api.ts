import { api } from "@/api";
import { APIResponse } from "@/api";
import { Roadmap } from "./type";

export const getRoadmaps = async () => {
    try {
        const res = await api.get<APIResponse<Roadmap[]>>("/roadmaps")
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

export const getPublicRoadmaps = async () => {
    try {
        const res = await api.get<APIResponse<Roadmap[]>>("/roadmaps/public")
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


export const getRoadmapById = async (roadmapId: string) => {
    try {
        const res = await api.get<APIResponse<Roadmap>>(`/roadmaps/${roadmapId}`)
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
