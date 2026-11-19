# AETHER

AETHER is a fictional entertainment website for friends. Profiles, missions, requests, and applications are imaginary and designed to remain harmless. The interface uses a black and dark-navy palette with restrained neon-blue accents.

## Project structure

```text
AETHER/
├── login.html
├── done.html
├── loading.html
├── dashboard.html
├── choose-operative.html
├── operative-info.html
├── missions.html
├── request.html
├── become-operative.html
├── other.html
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── supabase.js
│   │   ├── auth.js
│   │   ├── navigation.js
│   │   ├── animations.js
│   │   ├── missions.js
│   │   └── requests.js
│   └── images/
│       ├── logo.png       # optional; reserved for your own AETHER logo
│       └── friend.jpg     # add the featured profile image here
└── README.md
```

## Open in Visual Studio Code

1. Extract the ZIP archive.
2. Open Visual Studio Code.
3. Choose **File → Open Folder** and select the extracted `AETHER` folder.
4. Add your profile image at `assets/images/friend.jpg`.
5. Open the folder using a local static server (recommended), for example the VS Code Live Server extension. Avoid opening protected pages directly with `file://`, because browser authentication/session behavior and relative paths can vary.

The `assets/images/logo.png` path is reserved for an optional logo asset. The current interface uses a text wordmark and does not require this file.

## Configure Supabase Authentication

1. Create a project at [Supabase](https://supabase.com/).
2. In the Supabase project dashboard, open **Project Settings → API** (or the API keys area in the current dashboard).
3. Copy the project URL and the public `anon` / publishable key.
4. Open `assets/js/supabase.js`.
5. Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with those public values.
6. Save the file and reload the site.

Example format (use your own values):

```js
const SUPABASE_URL = "https://your-project-ref.supabase.co";
const SUPABASE_ANON_KEY = "your-public-anon-or-publishable-key";
```

**Never use a `service_role` key or any secret key in browser JavaScript.** The public key is intended for browser use; access control must be enforced by Supabase Auth and database Row Level Security if you later add database storage.

## Create a test user

1. In the Supabase dashboard, open **Authentication → Users**.
2. Choose **Add user** / **Create new user**.
3. Enter a test email and a strong password.
4. Confirm the user if your project's email-confirmation settings require it.
5. Use that email and password on `login.html`.

The login page calls `signInWithPassword()` and only advances after Supabase returns a valid user and session. The verification and loading pages also check the session. Authentication has **not** been tested against your Supabase project because no project credentials or test account were supplied with this project.

## Profile image

Place your own image at exactly:

`assets/images/friend.jpg`

The image is displayed as a rectangular crop with `object-fit: cover`. If the file is missing, a clean icon placeholder appears. Use an image you have permission to use. No replacement image is bundled.

## Run locally

Recommended: install the **Live Server** extension in VS Code, right-click `login.html`, and select **Open with Live Server**. Use the local URL shown by the extension. You can also serve the folder with any static HTTP server.

The site loads Supabase JS v2, Font Awesome 6.4.0, and JetBrains Mono from their CDNs, so those resources require an internet connection. The local HTML/CSS/JS files themselves need no build process.

## Data behavior and database

- Authentication is handled by Supabase Auth.
- The featured profile and mission descriptions are static demo content.
- Request submissions and operative applications are saved in the browser's `localStorage` for this prototype only. They are not sent to Supabase and are not shared between browsers/devices.
- No database tables are required for the current prototype.

If you later choose to store requests/applications in Supabase, create separate tables (for example `challenge_requests` and `operative_applications`) with a user ownership column such as `user_id uuid references auth.users(id)`. Enable Row Level Security on each table. Add policies so authenticated users can insert rows only where `user_id = auth.uid()`, and select/update/delete only their own rows. Validate input on the server/database side as well. Do not rely on front-end checks as a security boundary.

## Troubleshooting

- **ACCESS DENIED / invalid login:** check the email/password, confirm the user exists, and review Supabase Auth email-confirmation settings.
- **Supabase is not configured:** verify both placeholders in `assets/js/supabase.js` were replaced and there are no extra spaces or quote errors.
- **Page redirects to login:** sign in first; dashboard and feature pages require an active Supabase session.
- **CDN resources do not load:** check internet access, browser extensions, and the CDN URLs.
- **Image placeholder appears:** check the exact path and spelling `assets/images/friend.jpg`; file names are case-sensitive on many hosts.
- **Navigation appears unresponsive:** serve the project over HTTP with Live Server, then inspect the browser developer console for missing files or JavaScript errors.
- **Request/application not retained:** demo submissions use browser `localStorage`; clearing site data removes them.
