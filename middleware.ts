// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  console.log('Path:', request.nextUrl.pathname)
  const {pathname} = request.nextUrl

   // Handle root redirect
  if (pathname === '/') {
    console.log('Redirecting root to /id')
    return NextResponse.redirect(new URL('/id', request.url))
  }

  const segments = pathname.split('/')
  const locale = segments[1]
  const route = segments[2]
  
   // Only handle locale route
  if(!['id', 'en'].includes(locale)){
    return NextResponse.next()
  }

  // Public routes
  // if(!route || route == 'login'){
  //   return NextResponse.next()
  // }
  
  // Handle Supabase auth
  const response = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )
  
  const {data: {session},} = await supabase.auth.getSession()

  const authRedirectsRoutes = ['login', 'register']

  // No auth required
  const publicRoute = [...authRedirectsRoutes, 'forgot-password', 'reset-password']

  const isAuthRedirectRoute = authRedirectsRoutes.includes(route || '')
  const isPublicRoute = !route || publicRoute.includes(route)

  if(!route){
    if(!session){
      console.log("No session on homepage, redirecting to login")
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }else{
      console.log("Has homepage, redirecting to home")
      return NextResponse.redirect(new URL(`/${locale}/home`, request.url))
    }
  }

  // if user is not authenticated
  if(!session && !isPublicRoute){
    console.log("Redirecting to the login page")
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if(session && isAuthRedirectRoute){
    console.log("Has session but wanna access login page")
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url))
  }

  console.log("Session on middleware : ", session)

  // Public routes
  // if(!route || route == 'login'){
  //   return NextResponse.next()
  // }
  
  // await supabase.auth.getUser()
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}