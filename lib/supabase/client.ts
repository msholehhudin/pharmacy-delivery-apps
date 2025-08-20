
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY
// export const supabase = createClient(supabaseUrl, supabaseKey)

// import {createBrowserClient} from '@supabase/ssr'
// export function createClient(){
//     return createBrowserClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//     )
// }

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
