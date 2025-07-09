import axios from 'axios'
import Cookies from 'js-cookie';

 const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    // baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  api.interceptors.request.use(
    config => {
        const token = Cookies.get('XSRF-TOKEN');
        if(token && !config.url?.includes('/sanctum/csrf/cookie')){
            // console.log("Setting X-XSRF-TOKEN:", decodeURIComponent(token));
            config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token)
        }else {
          console.warn("No XSRF-TOKEN found in cookies");
          // console.warn("Token : ", token);
        }

        return config
    },
    error => Promise.reject(error)
  )

  api.interceptors.response.use(
    response => response,
    error => {

      const isLoadingPage = window.location.pathname.startsWith('/login')
      if(error.response?.status === 401 && !isLoadingPage){
        const redirectPath = encodeURIComponent(window.location.pathname)

        if(!redirectPath.includes('/login)')){
          window.location.href = `/login?redirect=${redirectPath}`
        }
      }
        return Promise.reject(error)
    }
  )

  export default api