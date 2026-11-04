import api from "./api"


export const login = async (credentials) => {
    const responde = await api.post("/auth/login", credentials);
    return responde.data;
}