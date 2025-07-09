import axios from "axios";

export const serverAxios = (cookies = '') => axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        Cookie: cookies,
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json'
    }
})