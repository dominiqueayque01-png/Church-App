import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://tzwwagdeenifxwbisskq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6d3dhZ2RlZW5pZnh3Ymlzc2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5NzkxNjMsImV4cCI6MjA5ODU1NTE2M30.WJxXiM6JqKpIymMVTwUKM2E_V-y8cNzstBCDp8R_Hlg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
  },
});