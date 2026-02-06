// lib/supabase/middleware-client.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, response: Response) {
  // If it's a redirect from intl middleware, return it immediately
  if (response.status === 307 || response.status === 301 || response.status === 302 || response.status === 308) {
    const location = response.headers.get('location')
    if (location) {
      // Create a redirect response
      const redirectResponse = NextResponse.redirect(new URL(location, request.url))
      
      // Set up Supabase client to maintain auth session
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: (cookies) => {
              cookies.forEach(({ name, value, options }) => {
                redirectResponse.cookies.set(name, value, options)
              })
            },
          },
        }
      )
      
      await supabase.auth.getUser()
      return redirectResponse
    }
  }

  // For non-redirect responses
  const supabaseResponse = NextResponse.next({
    request,
  })

  // Copy headers from intl response
  response.headers.forEach((value, key) => {
    supabaseResponse.headers.set(key, value)
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  await supabase.auth.getUser()
  return supabaseResponse
}