import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSaved } from '@/context/SavedContext';
import { useAuth } from '@/context/AuthContext';
import { useRecipes } from '@/context/RecipeContext';
import { BookMarked, Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';

function RecipeDetails() {
  const { id } = useParams();
  const { isSaved, saveRecipe, unsaveRecipe } = useSaved();
  const { isAuthenticated } = useAuth();
  const { userRecipes } = useRecipes();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRecipe = userRecipes.find((r) => String(r.id) === String(id));
    if (userRecipe) {
      setRecipe(userRecipe);
      setLoading(false);
      return;
    }

    fetch('/recipes.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => String(r.id) === String(id));
        setRecipe(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, userRecipes]);

  const handleSave = () => {
    if (!isAuthenticated) return;
    isSaved(recipe.id) ? unsaveRecipe(recipe.id) : saveRecipe(recipe);
  };

  if (loading) return <p className="text-center py-20 text-stone-500">Loading...</p>;
  if (!recipe) return <p className="text-center py-20 text-red-500">Recipe not found.</p>;

  const saved = isSaved(recipe.id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      <Link to="/recipes" className="flex items-center gap-1 text-sm text-stone-400 hover:text-amber-600 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Recipes
      </Link>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-72 md:h-96 object-cover rounded-2xl mb-8"
        />
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs text-amber-600 uppercase tracking-widest font-medium">{recipe.category}</span>
          <h1 className="text-3xl font-bold text-stone-800 mt-1 mb-2">{recipe.title}</h1>
          <p className="text-stone-500 text-sm max-w-2xl">{recipe.description}</p>
        </div>
        {isAuthenticated && (
          <button
            onClick={handleSave}
            className={`ml-4 p-2 rounded-full border transition-colors ${
              saved
                ? 'bg-amber-50 border-amber-300 text-amber-500'
                : 'bg-white border-stone-200 text-stone-400 hover:text-amber-500'
            }`}
          >
            <BookMarked className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: <Clock className="h-4 w-4 text-amber-500" />, label: 'Prep Time', value: recipe.prepTime },
          { icon: <Clock className="h-4 w-4 text-amber-500" />, label: 'Cook Time', value: recipe.cookTime },
          { icon: <Users className="h-4 w-4 text-amber-500" />, label: 'Servings', value: `${recipe.servings} people` },
          { icon: <ChefHat className="h-4 w-4 text-amber-500" />, label: 'Difficulty', value: recipe.difficulty },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-amber-100 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-1">{stat.icon}</div>
            <p className="text-xs text-stone-400 mb-1">{stat.label}</p>
            <p className="font-semibold text-stone-700 text-sm">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-stone-800 mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipe.ingredients?.map((ingredient, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-stone-600 py-2 border-b border-amber-50">
                <span className="w-2 h-2 bg-amber-500 rounded-full shrink-0" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-stone-800 mb-4">Preparation Steps</h2>
          <ol className="space-y-4">
            {recipe.steps?.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-stone-600">
                <span className="bg-amber-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {i + 1}
                </span>
                <p className="leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-amber-100">
        <p className="text-sm text-stone-400">
          Recipe by <span className="text-amber-600 font-medium">{recipe.author}</span>
        </p>
      </div>
    </div>
  );
}

export default RecipeDetails;