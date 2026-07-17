import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useRecipes } from '@/context/RecipeContext';
import { useNavigate } from 'react-router-dom';

function RecipeActions({ recipeId }) {
  const { deleteRecipe } = useRecipes();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    setShowConfirm(false);
  };

  return (
    <div className="flex gap-2 mt-2 px-4 pb-4">
      {showConfirm && (
        <div className="fixed inset-0 bg-stone-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="font-bold text-stone-800 mb-2">Hold on a second</h3>
            <p className="text-stone-500 text-sm mb-6">
              Are you sure you want to delete this recipe? Once it's gone, the world loses a masterpiece forever.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-amber-200 text-stone-600 py-2 rounded-lg text-sm hover:bg-amber-50 transition-colors"
              >
                Keep it
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                Delete it
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(`/edit/${recipeId}`)}
        className="flex-1 flex items-center justify-center gap-1 border border-amber-200 text-amber-600 py-1.5 rounded-lg text-xs hover:bg-amber-50 transition-colors"
      >
        <Pencil className="h-3 w-3" /> Edit
      </button>

      <button
        onClick={() => setShowConfirm(true)}
        className="flex-1 flex items-center justify-center gap-1 border border-red-200 text-red-400 py-1.5 rounded-lg text-xs hover:bg-red-50 transition-colors"
      >
        <Trash2 className="h-3 w-3" /> Delete
      </button>
    </div>
  );
}

export default RecipeActions;