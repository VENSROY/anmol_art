# Supabase Edge Functions

Server-only logic (image compression, activity logging, exports, sitemap).
Each function is its own folder with an index.ts. Deploy with:

    npm run fn:deploy -- <function-name>
