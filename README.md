# Verb Trainer MVP

A minimal React (Vite) app to practise Spanish present tense conjugations, with regular/irregular separation.

## Quick start
1) Install dependencies:
   ```bash
   npm install
   ```
2) Add React Router:
   ```bash
   npm install react-router-dom
   ```
3) Run the dev server:
   ```bash
   npm run dev
   ```

## What’s here
- **Practice**: quiz on random verb + subject; instant feedback + score.
- **Verbs**: table view with **regular** vs **irregular** (as preferred).
- **Settings**: local display name (future: link to Supabase profile).
- Tailwind pre-wired for fast styling.

## File map
- `src/data/verbs_es.js` — starter verb list (expand easily).
- `src/pages/Practice.jsx` — core quiz logic.
- `src/pages/Verbs.jsx` — list view.
- `src/pages/Settings.jsx` — local settings.
- `src/components/*` — navbar & cards.
- `tailwind.config.js` & `src/styles.css` — styling setup.

## Add more verbs
Edit `src/data/verbs_es.js`. Keep order of subjects:
`['yo','tú','él/ella/usted','nosotros','vosotros','ellos/ustedes']`.

## Roadmap
- Supabase auth, profiles, attempts, points, leaderboards.
- Packs per class (AQA 2026), multiple languages/tenses.
- Teacher dashboard & import/export.

## (Optional) Supabase schema (for later)
```sql
-- Users
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  class_code text, -- e.g., 7S / Y8 / Y12
  created_at timestamp with time zone default now()
);

-- Verbs & packs
create table if not exists verbs (
  id bigserial primary key,
  language text not null check (language in ('es','de','fr')),
  infinitive text not null,
  tense text not null default 'presente',
  is_regular boolean not null default true
);

create table if not exists conjugations (
  id bigserial primary key,
  verb_id bigint references verbs(id) on delete cascade,
  subject_index int not null check (subject_index between 0 and 5),
  form text not null
);

create table if not exists packs (
  id bigserial primary key,
  name text not null,
  language text not null,
  notes text
);

create table if not exists pack_verbs (
  pack_id bigint references packs(id) on delete cascade,
  verb_id bigint references verbs(id) on delete cascade,
  primary key (pack_id, verb_id)
);

-- Attempts & points
create table if not exists attempts (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  verb_id bigint references verbs(id),
  subject_index int not null,
  correct boolean not null,
  created_at timestamp with time zone default now()
);

create table if not exists points (
  user_id uuid primary key references auth.users(id) on delete cascade,
  total_points int not null default 0,
  updated_at timestamp with time zone default now()
);
```

## Wire up Supabase later
- Add `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Install client: `npm install @supabase/supabase-js`.
- Create a `src/lib/supabase.js`:
  ```js
  import { createClient } from '@supabase/supabase-js'
  export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
  ```
- Replace local data fetching with Supabase queries (start in `Practice.jsx`).
