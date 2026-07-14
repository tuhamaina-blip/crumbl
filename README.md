# Crumbl 

Crumbl is a modern, responsive recipe sharing platform that enables users to discover, organize, and share recipes with ease. The application provides an intuitive experience for browsing recipes by category, searching by name or ingredient, viewing detailed cooking instructions, saving favorite recipes, and submitting original creations.

The project emphasizes clean user interface design, responsive layouts, and modern frontend development practices while showcasing technologies such as React, React Router, Context API, Tailwind CSS, and component-based architecture.
## Problem Statement

Many recipe websites make it difficult to quickly find and organize recipes due to cluttered interfaces, excessive advertisements, and inconsistent layouts. Users also lack a simple way to save recipes they enjoy or contribute their own.

Crumbl solves this problem by providing a clean and intuitive platform where users can browse recipes by category, search for dishes by name or ingredient, save favorites, and share their own recipes in one convenient place.

## Planned Features

- Browse and search recipes by category (Breakfast, Lunch, Dinner, Desserts)
- View full recipe details with ingredients, steps, prep time, and servings
- Save favorite recipes to a personal collection
- Submit your own recipes through a form
- User registration and login with protected routes

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- Lucide React
- Context API (AuthContext, SavedContext)

## Project Structure
```
src/
├── components/
│   ├── ui/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── RecipeCard.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   └── SavedContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Recipes.jsx
│   ├── RecipeDetails.jsx
│   ├── Submit.jsx
│   ├── Saved.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── App.jsx
└── main.jsx
```

## Getting Started

```bash
git clone https://github.com/tuhamaina-blip/crumbl.git
cd crumbl
npm install
npm run dev
```

