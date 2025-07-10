// import { createServerClient } from "@supabase/ssr";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { createClient } from "./lib/supabase/server";

// const PUBLIC_ROUTES = ['/(auth)']
// const PROTECTED_ROUTES = ['/(dashboard)', '/home', '/users'] 
// const AUTH_ROUTES = ['/login']


// export const middleware = async(request: NextRequest) => {

//     // Create a response object we can modify
//     let response = NextResponse.next({request})
    
//       // Create Supabase client
//       const supabase = createClient()

//     //   Refresh session if expired
//     const {data: {session}} = await supabase.auth.getSession()

//     const {pathname, searchParams} = request.nextUrl
//     const cookies = request.headers.get('Cookie') || ''

//     if(
//         pathname.startsWith('/_next') ||
//         pathname.startsWith('/api') ||
//         pathname.includes('.')
//     ){
//         console.log('masuk ke if utama static check')
//         return NextResponse.next()
//     }

//     console.log('visiting : ', pathname)

    

//     // Skip auth check for public routes
//     if(PUBLIC_ROUTES.some(route => pathname.startsWith(route))){
//         return NextResponse.next()
//     }

//     // Check authentication

//     // let isAuthenticated = false
//     // try{
//     //     const axios = serverAxios(cookies)
//     //     const response = await axios.get('/api/user')
//     //     isAuthenticated = !!response.data
//     // }catch(error){
//     //     console.error('Authentication check failed : ', error)
//     //     isAuthenticated = false
//     // }

//     const {data: {session}} = await 

//     console.log('this Authenticated : ', isAuthenticated)
//     if(pathname === '/'){
//         const redirectPath = searchParams.get('redirect')  ?? (isAuthenticated ? '/home' : '/login')
//         if(pathname !== redirectPath){
//             return NextResponse.redirect(new URL(redirectPath, request.url))
//         }
//     }

//     // Protect dashboard routes - Redirect unauthenticated users from protected routes
//     if(PROTECTED_ROUTES.some(route => pathname.startsWith(route)) && !isAuthenticated){
//         const loginUrl = new URL('/login', request.url)
 
//             loginUrl.searchParams.set('redirect', pathname + request.nextUrl.search)
    
//         return NextResponse.redirect(loginUrl)
//     }

//     // Redirect authenticated users away from auth
//     if(isAuthenticated && AUTH_ROUTES.some(route => pathname.startsWith(route))){
//         console.log('user aktif lagi di halaman login ')
//         const redirectTo = searchParams.get('redirect') || '/home'
//         return NextResponse.redirect(new URL(redirectTo, request.url))
//     }

//     return NextResponse.next()
   
// }

// export const config = {
//     matcher: [
//         '/',
//         '/(dashboard)/:path*', 
//         '/(auth)/:path*',
//         '/login',
//         '/home/:path*'
//     ]
// }