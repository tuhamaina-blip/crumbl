import { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [userRecipes, setUserRecipes] = useState([]);

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      author: recipe.author || 'You',
      image: recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    };
    setUserRecipes((prev) => [newRecipe, ...prev]);
    return newRecipe;
  };

  const updateRecipe = (id, updatedData) => {
    setUserRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
    );
  };

  const deleteRecipe = (id) => {
    setUserRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ userRecipes, addRecipe, updateRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);