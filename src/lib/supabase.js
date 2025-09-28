import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sexmngqbnbcutkkwqeqa.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_gU-sipK03iXfPMPzZ4NyNw_F0XMJcol'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
        