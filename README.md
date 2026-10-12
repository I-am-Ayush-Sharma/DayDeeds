# DayDeeds - AI Journal App

DayDeeds is a warm, personal journaling app with a React + TypeScript frontend and a separate Express API. Clerk handles sign-in; the API verifies Clerk tokens and stores each user's journal entries in MongoDB.

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Auth: Clerk
- Backend: Node.js, Express, TypeScript in `server/`
- Database: MongoDB local or Atlas, with journal entries scoped to the signed-in Clerk user
- Security: Clerk-verified API requests, request validation, Helmet, CORS, and rate limiting

## Local development

1. Create a root `.env` file based on `.env.example`. Configure both Clerk keys, MongoDB, and a session secret.
2. Install dependencies:

```bash
npm install
```

3. Start the app in development mode:

```bash
npm run dev
```

This starts the Vite app and API server together. MongoDB must be running and reachable.

## Clerk setup

Set the Clerk development-instance keys:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

The frontend key is public and is used by Clerk's React SDK. The secret key stays server-side and is used to verify authenticated API requests. Never expose or commit the secret key.

Users can save journal entries and drafts, search/filter/favorite/delete them in History, and view saved entries in the Dashboard and Calendar. Each API query is restricted to the active Clerk user.

## MongoDB local + Atlas support

The code under `server/` still supports both local MongoDB and MongoDB Atlas connection modes.

### Local MongoDB

```env
MONGODB_CONNECTION_MODE=local
MONGODB_URI_LOCAL=mongodb://localhost:27017/daydeeds
```

### MongoDB Atlas

```env
MONGODB_CONNECTION_MODE=atlas
MONGODB_URI_ATLAS=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

### Direct override

```env
MONGODB_URI=mongodb://localhost:27017/daydeeds
```

This is useful when you want to point the backend at one exact database URL.

## AI reflection

AI rewrite and monthly reflection need a Gemini API key. Add it to the server environment as `GEMINI_API_KEY`; until then the app reports that AI is unavailable rather than showing a fabricated response.

## Production build

```bash
npm run build
```

## Testing

```bash
npm run test
```

## Notes

- The active auth path is Clerk-based. The older session-based `/api/auth` endpoints remain separate and are not used by the frontend.
- MongoDB stores journal entries and drafts; local development defaults to `mongodb://localhost:27017/daydeeds`.
- Keep `.env` values out of version control and use real secrets only in your local environment or deployment platform.
