import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jrjrfhmdakjmceyxmrdy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyanJmaG1kYWtqbWNleXhtcmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNDg4NzAsImV4cCI6MjAwOTgyNDg3MH0.rxeB53hywAJplFoX6XkQ6ZKV9i1AGRewnPfo50ORzII";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
