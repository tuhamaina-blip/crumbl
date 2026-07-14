import { createContext, useContext, useState } from 'react';

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [saved, setSaved] = useState([]);

  const saveRecipe = (recipe) => {
    setSaved((prev) => {
      const exists = prev.find((r) => r.id === recipe.id);
      if (exists) return prev;
      return [...prev, recipe];
    });
  };

  const unsaveRecipe = (id) => {
    setSaved((prev) => prev.filter((r) => r.id !== id));
  };

  const isSaved = (id) => saved.some((r) => r.id === id);

  return (
    <SavedContext.Provider value={{ saved, saveRecipe, unsaveRecipe, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);