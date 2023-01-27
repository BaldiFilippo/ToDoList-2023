import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bwzbqdcvsrtyemiwicpc.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3emJxZGN2c3J0eWVtaXdpY3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4MTc3OTQsImV4cCI6MTk5MDM5Mzc5NH0.ydC83C84YlfR0lMPcGmgqatvaqya3WJXGWfygBSMd7g'

export default createClient(supabaseUrl, supabaseAnonKey)
