# 🎥 Movie Explorer App

A feature-rich movie discovery platform built with **Next.js 14**, **Tailwind CSS**, and **shadcn/ui**, allowing users to browse, search, and favorite movies using the TMDB API.

---

## ✨ Features

### 🔐 **Authentication System**

- JWT-based login and registration
- Secure session management using cookies
- Protected routes for authenticated users

### 🎬 **Movie Browsing & Search**

- Fetch movies from TMDB API
- Display posters, ratings, and release years
- Dynamic search functionality
- Pagination for seamless browsing

### ⭐ **Favorites Management**

- Add or remove movies from favorites
- Stored securely in PostgreSQL via Prisma
- Access a dedicated Favorites page

### 🌟 **Responsive UI/UX**

- Responsive design with dark/light theme support
- Smooth animations with Framer Motion
- Image optimization via Next.js
- Skeleton loaders for improved UX

---

## 🤝 Live Demo

Click below to start exploring!

```bash
Discover Movies → /all-movies
```

---

## 💡 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Prisma ORM, PostgreSQL (NeonDB), JWT Authentication
- **API**: TMDB (The Movie Database)

---

## 📁 Project Structure Overview

```
app/
├── (main)/
│   ├── all-movies/        # Movie listing & [id] detail page
│   ├── favorites/          # User's favorite movies
│   ├── profile/            # Profile & recent activity
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── layout.tsx           # Main layout for authenticated routes

app/api/
├── favorite/             # Add/Remove favorites
├── favorite/check/       # Check if movie is favorited
├── login/                # Login route
└── register/             # Register route

components/
├── Header.tsx
├── Sidebar.tsx
├── MovieCard.tsx
├── MovieCardSkeleton.tsx
├── MovieDetailClient.tsx
├── FavoritesClient.tsx
├── auth-layout.tsx
└── ui/ (shadcn components)

lib/
└── prisma.ts           # Prisma client
```

---

## 🚀 Getting Started

### 🔍 Prerequisites

- Node.js 16.8+
- npm or yarn
- PostgreSQL (NeonDB or local)
- TMDB API Key ([https://www.themoviedb.org/](https://www.themoviedb.org/))

### 📋 Installation Steps

```bash
git clone https://github.com/YOUR_USERNAME/movie-explorer.git
cd movie-explorer
npm install

# Create .env file
cp .env.example .env
```

### 🔧 Database Setup

```bash
npx prisma migrate dev --name init
```

### 🌝 Run the App

```bash
npm run dev
```

Visit: `http://localhost:3000`

---

## 🔐 Environment Variables

```bash
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-secret-key"
TMDB_API_KEY="your-tmdb-api-key"
```

---

## 🌐 Deployment

### ✈ Vercel (Recommended)

- Connect GitHub repo to Vercel
- Add environment variables via dashboard
- Deploy instantly

### Other Options

- Netlify
- AWS Amplify
- Any host supporting Next.js

---

## 🙏 Acknowledgements

- [TMDB API](https://www.themoviedb.org/) for movie data
- [shadcn/ui](https://ui.shadcn.com/) for modern components
- [NeonDB](https://neon.tech/) for PostgreSQL hosting

---

## 🧱 Author

**Sagar Manchakatla**
[LinkedIn](https://www.linkedin.com/in/sagar-manchakatla-4163-523b44284/) • [GitHub](https://github.com/sagarmanchakatla)

---

## © License

&#x20;Copyright © 2025 Sagar Manchakatla.
