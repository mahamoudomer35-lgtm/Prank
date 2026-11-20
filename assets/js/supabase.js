/*
  AETHER Supabase setup.
  Replace both placeholders with your project's public URL and anon/publishable key.
  Never put a service_role key or any secret key in browser code.
*/
(() => {
  const SUPABASE_URL = "https://ldtvnxdjlhghalsvrgfy.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_EHGKhBIYVD6pjs-ThrDDeQ_6YXOFNwR";
sb_publishable_EHGKhBIYVD6pjs-ThrDDeQ_6YXOFNwRYOUR_SUPABASE_URL
  const configured = !SUPABASE_URL.includes("YOUR_") &&
                     !SUPABASE_ANON_KEY.includes("YOUR_");
  let client = null;

  if (configured && window.supabase?.createClient) {
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  window.AETHER = window.AETHER || {};
  window.AETHER.supabase = client;
  window.AETHER.supabaseConfigured = Boolean(client);
})();
