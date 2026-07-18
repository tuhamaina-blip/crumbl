# Crumbl

Crumbl is a modern, responsive recipe sharing platform that enables users to discover, organize, and share recipes with ease. The application provides an intuitive experience for browsing recipes by category, searching by name, viewing detailed cooking instructions, saving favorite recipes, and submitting original creations with a multi-step form.

The project emphasizes clean user interface design, responsive layouts, and modern frontend development practices while showcasing React, React Router, Context API, Tailwind CSS, and component-based architecture.



## Problem Statement

Many recipe websites make it difficult to quickly find and organize recipes due to cluttered interfaces, excessive advertisements, and inconsistent layouts. Users also lack a simple way to save recipes they enjoy or contribute their own.

Crumbl solves this by providing a clean, distraction-free platform where users can browse by category, search for dishes, save favorites, and share their own recipes — all in one place.

## Features

- Browse and search recipes by category (Breakfast, Lunch, Dinner, Desserts)
- View full recipe details with ingredients, numbered steps, prep time, servings, and difficulty
- Save favorite recipes to a personal library
- Submit original recipes through a 3-step form (Basics, Details, Review)
- Edit and delete your own submitted recipes
- User registration and login with protected routes
- Persistent auth state using localStorage
- Responsive design with a warm amber and stone color scheme
- Featured recipes section on the home page

## Tech Stack

- React
- Vite
- React Router 
- Tailwind CSS 
- shadcn/ui
- Lucide React


## Project Structure
```
src/
├── components/
│   ├── ui/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeActions.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── SavedContext.jsx
│   └── RecipeContext.jsx
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

## License

This project is licensed under the MIT License