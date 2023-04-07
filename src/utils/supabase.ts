import { createClient } from "@supabase/supabase-js";
import config from "config";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  config.get<string>("supabaseUrl"),
  config.get<string>("supabaseAnonKey")
);

export default supabase;
