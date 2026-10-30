# ANIME BOY — Sinhala Anime Streaming Starter

A responsive React + Vite streaming catalogue inspired by the supplied mobile screenshots. It uses an original ANIME BOY wordmark, near-black navy surfaces and emerald-green accents. The included demo titles use replaceable placeholder artwork; replace them with artwork and streams you have permission to distribute.

## Included

- Responsive homepage hero carousel, horizontal poster rails, upcoming labels, mobile hamburger menu and fixed safe-area bottom navigation.
- Movie/series listing, title/genre/language search and filters, detail pages, watch page with native HTML5 video + WebVTT subtitle track, request form and local watchlist.
- Supabase email/password auth, PostgreSQL persistence, profile roles, admin-only content CRUD, publish/unpublish, poster/backdrop/video storage uploads, series season/episode creation, and request review list.
- SQL RLS policies ensure public users can read only published titles and only users with the server-checked `profiles.role = 'admin'` can change catalogue records or upload assets.

## 1. Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL printed by Vite. Without Supabase configuration, the homepage runs in demo mode; forms that need persistence explain that Supabase must be configured. Authentication and database writes are not simulated.

## 2. Configure Supabase

1. Create a Supabase project.
2. In **Project Settings → API**, copy the Project URL and the `anon` / publishable key into `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Run `supabase/schema.sql` in the Supabase SQL Editor as the project owner.
4. In **Authentication → Providers**, enable Email. Configure email confirmation and your allowed redirect URLs for local and production domains.
5. The SQL creates `anime-media` (public image bucket) and `anime-videos` (private video bucket), with MIME and size limits. Admins can upload. Public media can be read; private video objects are not public. For private video playback, create short-lived signed URLs from a trusted server/Edge Function before passing them to the player, or use a licensed streaming provider/CDN with signed playback URLs. Do not make large copyrighted video files public.
6. Register an account through `/signup`. Then promote the intended account from the Supabase SQL Editor, replacing the email:

```sql
update public.profiles p
set role = 'admin'
from auth.users u
where p.id = u.id and u.email = 'YOUR_ADMIN_EMAIL';
```

The admin role is stored in the database and checked by PostgreSQL RLS on every protected read/write and Storage policy. Never put the Supabase `service_role` key in `.env` or frontend code.

## 3. Admin workflow

Sign in, then open `/admin`. Add titles, Sinhala/English names, metadata, artwork and a hosted video URL or upload a supported video file. Use the visibility action in the content list to publish/unpublish. Use the **Manage series episodes** panel to create a season if needed and add numbered episodes with hosted video and optional WebVTT subtitle URLs. Anime requests are visible in the dashboard.

The dashboard upload control validates supported MIME types and size before upload. Uploads use the Storage REST endpoint with the signed-in admin JWT and display byte-level percentage progress. For reliable resumable uploads on multi-GB files, use TUS resumable uploads or a dedicated media pipeline (e.g. Mux/Cloudflare Stream) behind a server-side authorization endpoint.

## 4. Production checklist

- Deploy the static frontend to Vercel, Netlify, Cloudflare Pages or another static host; set the same environment variables in the host dashboard.
- Add the production domain to Supabase Auth redirect URLs and CORS settings.
- Use a trusted backend/Edge Function for private signed playback URLs, transcoding, virus scanning, quotas, and resumable uploads. The browser should never receive the Supabase service-role key.
- Configure backups, rate limits/CAPTCHA for public request submission, moderation, and an admin account recovery process.
- Add real privacy/terms pages and verify you have distribution rights for every anime poster, subtitle and video. This starter does not include copyrighted streams.
- The watchlist in this starter is stored in the current browser session state. For cross-device watchlists, add a `watchlist` table with owner-only RLS policies.
- Add a real YouTube channel URL in `VITE_YOUTUBE_CHANNEL_URL`; the Subscribe link is intentionally hidden until you configure it.

## Notes / limitations

This is a complete starter implementation, not a hosted streaming service. You must supply a Supabase project, admin account, licensed media files or supported hosted URLs, and production hosting. Private-bucket video upload is enabled for admins, but private playback requires a signed-URL endpoint as described above. The frontend does not pretend those external services are already provisioned.

### Private video playback endpoint

Deploy the included Edge Function after setting the project secrets (the `SUPABASE_SERVICE_ROLE_KEY` stays server-side):

```bash
supabase secrets set SUPABASE_URL="https://YOUR_PROJECT.supabase.co" SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
supabase functions deploy playback-url --no-verify-jwt
```

The function checks that the anime and requested episode are published and that the episode belongs to the anime before issuing a one-hour signed URL from the private `anime-videos` bucket. It never returns the service-role key to the browser. Restrict the function with rate limiting in production and consider adding user/IP throttling. Direct hosted URLs are returned unchanged; use trusted providers and signed playback URLs for production media.
