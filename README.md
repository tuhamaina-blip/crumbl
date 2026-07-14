# Crumbl 

A warm and cozy recipe sharing web app. Users can browse recipes by category, view full recipe details with ingredients and steps, save their favorite recipes, and submit their own dishes to the community.


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

