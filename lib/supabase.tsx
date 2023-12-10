import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
// console.log('supabaseUrl', supabaseUrl, 'supabaseKey', supabaseKey)

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: true },
})

export default supabase

// export default function initFirebase() {
//   if (getApps().length === 0) {
//     return initializeApp(config)
//   }
// }
