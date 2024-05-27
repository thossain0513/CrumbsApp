import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwnhavvhadbgqhldazvs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bmhhdnZoYWRiZ3FobGRhenZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3NTU5NTUsImV4cCI6MjAzMjMzMTk1NX0.YyqgKXtBPYvPZFgT8VTbyTILtuZZcAtCAL0UWiWMdF8';

export default supabase = createClient(supabaseUrl, supabaseKey);