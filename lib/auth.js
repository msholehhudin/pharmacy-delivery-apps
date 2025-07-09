import {serverAxios} from './server-axios'

export const getServerAuth = async(cookies) => {
    try{
        const {data} = await serverAxios(cookies).get('/api/user')
        return data || null
    }catch{
        return null
    }
}