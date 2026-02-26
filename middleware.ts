// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  console.log('Path:', request.nextUrl.pathname)
  const {pathname} = request.nextUrl

   // Handle root redirect
  // if (pathname === '/') {
  //   console.log('Redirecting root to /id')
  //   return NextResponse.redirect(new URL('/id', request.url))
  // }

  const segments = pathname.split('/')
  const locale = segments[1]
  const route = segments[2] ?? null
  
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
    const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.getUser()
  }

  const authRoutes = ['login', 'register']
  const publicRoutes = [...authRoutes, 'forgot-password', 'reset-password']

  // Redirect /id → /id/login
  if (pathname === `/${locale}`) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  // Not logged in & private route
  if (!session && route && !publicRoutes.includes(route)) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  // Logged in but accessing login/register
  if (session && route && authRoutes.includes(route)) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url))
  }

  console.log("Session on middleware : ", session)

 
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}