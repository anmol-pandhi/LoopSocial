import { createClient } from "@supabase/supabase-js";
import { type Database } from "@/types/supabase";

// Default to demo values if environment variables are not set
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://xyzcompany.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdGJyaXBwZWt6YnZpaHdrYnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NjY5NzcsImV4cCI6MjAxNTU0Mjk3N30.S23aDwrG0KX3zR3MUGgIjP_LfLtHw4LGAydoYDQZ2-o";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
