# 🍴 Dipper

A recipe-sharing web app. Users can post dishes they've cooked — with a photo, ingredients, and steps — browse a feed of everyone's recipes, follow other cooks, comment, and save recipes into cookbooks.

## Features

- **Recipes** — create recipes (title, description, ingredients, steps, photo) and browse a global feed + detail pages.
- **Auth** — sign in with Auth0; a first-time user picks a username before using the app
- **Profiles** — public profiles showing a user's recipes and follower/following counts
- **Follows** — follow other users and see a dedicated "from people you follow" feed
- **Likes** — ❤️ a recipe (implemented as saving it to your default **"Liked Recipes"** cookbook)
- **Cookbooks** — create named collections and save recipes into them
- **Comments** — comment on recipes
- **Images** — recipe photos are uploaded straight to AWS S3 via presigned URLs

## Tech stack

| Layer | Tech |
|---|---|
| Client | React (Create React App), React Router, Bootstrap 5, `@auth0/auth0-react` |
| Server | Node.js + Express (ES modules) |
| Database | PostgreSQL (`pg`) |
| Auth | Auth0 (`express-oauth2-jwt-bearer` validates JWTs) |
| Image storage | AWS S3 (`aws-sdk`, presigned PUT/GET URLs) |

## Prerequisites

- Node.js 18+
- PostgreSQL running locally
- An Auth0 application + API (for login)
- An AWS S3 bucket (for recipe images)

## Setup

### 1. Database

Create the database and tables (the `CREATE DATABASE` lives in `users.sql`):

```bash
psql -U postgres -f server/database/users.sql
psql -U postgres -d db -f server/database/recipes.sql
psql -U postgres -d db -f server/database/cookbooks.sql
psql -U postgres -d db -f server/database/comments.sql
psql -U postgres -d db -f server/database/follows.sql
```

### 2. Environment variables

Copy the example files and fill in your values (see each `.env.example` for the full list):

```bash
cp server/.env.example server/.env      # DB_*, AWS_*, AUTH0_DOMAIN, AUTH0_AUDIENCE
cp client/.env.example client/.env      # REACT_APP_AUTH0_*  (REACT_APP_API_URL optional; defaults to localhost:5000)
```

### 3. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

## Running locally

Run the two servers in separate terminals:

```bash
# Terminal 1 — API on http://localhost:5000  (must run from server/ so dotenv finds .env)
cd server
node index.js

# Terminal 2 — client dev server on http://localhost:3000
cd client
npm start
```

Then open http://localhost:3000. (On Windows, `open-cmds.bat` launches both plus a `psql` shell.)

## API overview

All recipe/cookbook write routes and profile/follow routes require an Auth0 bearer token. Browsing recipes and comments is public.

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/recipes` | – | Feed (recipe-bot recipes sorted last) |
| GET | `/recipes/:id` | – | Recipe detail |
| POST | `/recipes` | ✅ | Create a recipe (returns S3 presigned PUT URL) |
| GET | `/recipes/following` | ✅ | Recipes from users you follow |
| GET/POST/DELETE | `/recipes/:id/like` | ✅ | Like status / like / unlike |
| GET/POST | `/recipes/:id/comments` | –/✅ | List / add comments |
| GET/PUT | `/profile` | ✅ | Your profile / set username + pfp |
| GET | `/profile/:username` | – | Public profile + recipes |
| GET/POST/DELETE | `/profile/:username/follow` | ✅ | Follow status / follow / unfollow |
| GET/POST | `/cookbooks` | ✅ | List your cookbooks / create one |
| GET/DELETE | `/cookbooks/:id` | ✅ | Cookbook + recipes / delete |
| POST/DELETE | `/cookbooks/:id/recipes[/:recipeId]` | ✅ | Add / remove a recipe |