import {createClient} from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = 'https://pmjdlbjdhorclvnptaod.supabase.co'
const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtamRsYmpkaG9yY2x2bnB0YW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1MzczMTksImV4cCI6MTk4MjExMzMxOX0.wU9mqQwRzIucXj94ZZDjz3MPRaC4bBGaB7k91Sq7w64', {
    auth: {
        storage: AsyncStorage,
        persistSession: true,
        detectSessionInUrl: true,
        autoRefreshToken: true,
    },
})

export default supabase