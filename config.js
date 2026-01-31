// This file acts as a bridge between the browser and environment variables.
// In a production environment, these should be replaced by actual values during deployment.

const CONFIG = {
    SUPABASE_URL: "https://zmoqbbbexruzfqvrvytc.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptb3FiYmJleHJ1emZxdnJ2eXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NjQxMjQsImV4cCI6MjA4NTM0MDEyNH0.IyHdoarhuD_1Ntsoz826yaV4k2YBoMHcpv5G2HXc7WA"
};

window.SUPABASE_CONFIG = CONFIG;
