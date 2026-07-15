import { Link, useNavigate } from 'react-router-dom';
import { Clock, Users, BookMarked } from 'lucide-react';
import { useSaved } from '@/context/SavedContext';
import { useAuth } from '@/context/AuthContext';

function RecipeCard({ recipe }) {
  const { saveRecipe, unsaveRecipe, isSaved } = useSaved();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const saved = isSaved(recipe.id);

  const handleSave = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    saved ? unsaveRecipe(recipe.id) : saveRecipe(recipe);
  };

  return (
    <div className="border border-amber-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <Link to={`/recipes/${recipe.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <span className="text-xs text-amber-600 uppercase tracking-wide font-medium">{recipe.category}</span>
        <Link to={`/recipes/${recipe.id}`}>
          <h3 className="font-semibold text-stone-800 mt-1 mb-2 hover:text-amber-600 transition-colors">{recipe.title}</h3>
        </Link>
        <p className="text-xs text-stone-500 mb-3 line-clamp-2">{recipe.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 text-xs text-stone-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {recipe.prepTime}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {recipe.servings} servings
            </span>
          </div>
          <button
            onClick={handleSave}
            className={`transition-colors ${saved ? 'text-amber-500' : 'text-stone-300 hover:text-amber-400'}`}
            title={isAuthenticated ? (saved ? 'Unsave recipe' : 'Save recipe') : 'Sign in to save recipes'}
          >
            <BookMarked className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;