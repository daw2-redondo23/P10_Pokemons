import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pwmxejejyiiydojyarhn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bXhlamVqeWlpeWRvanlhcmhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzE4MDAwNCwiZXhwIjoxOTkyNzU2MDA0fQ.8pmu-pff8PMMQnn4lkmZCGcKiIAaoj0x-kLvdS16aGs'
export const supabase = createClient(supabaseUrl, supabaseKey)