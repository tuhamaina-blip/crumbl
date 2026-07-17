import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSaved } from '@/context/SavedContext';
import { useRecipes } from '@/context/RecipeContext';
import RecipeCard from '@/components/RecipeCard';
import { BookMarked, Plus } from 'lucide-react';
import RecipeActions from '@/components/RecipeActions';

function Saved() {
  const { saved } = useSaved();
  const { userRecipes } = useRecipes();
  const [activeTab, setActiveTab] = useState('Saved');
  const [selectedCategory, setSelectedCategory] = useState('All Recipes');

  const categories = ['All Recipes', 'Breakfast', 'Lunch', 'Dinner', 'Desserts'];

  const tabs = ['Saved', 'My Creations'];

  const currentRecipes = activeTab === 'Saved' ? saved : userRecipes;

  const filteredRecipes = currentRecipes.filter((recipe) =>
    selectedCategory === 'All Recipes' || recipe.category === selectedCategory
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-800">My Library</h1>
        <p className="text-stone-400 text-sm mt-1">Manage your personal collection of culinary inspirations and creations.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-amber-100 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedCategory === category
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-stone-600 border-amber-200 hover:bg-amber-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Empty state with save new recipe card */}
          <Link
            to="/recipes"
            className="border-2 border-dashed border-amber-200 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-amber-50 transition-colors min-h-[200px]"
          >
            <Plus className="h-8 w-8 text-amber-300 mb-2" />
            <p className="text-sm font-medium text-stone-500">
              {activeTab === 'Saved' ? 'Save a Recipe' : 'Submit a Recipe'}
            </p>
            <p className="text-xs text-stone-400 text-center mt-1">
              {activeTab === 'Saved' ? 'Browse and bookmark your favorites' : 'Share your own dish'}
            </p>
          </Link>
        </div>
      ) : (
        <>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id}>
                <RecipeCard recipe={recipe} />
                {activeTab === 'My Creations' && (
                  <RecipeActions recipeId={recipe.id} />
                )}
              </div>
            ))}

            {/* Save a New Recipe card */}
            <Link
              to={activeTab === 'Saved' ? '/recipes' : '/submit'}
              className="border-2 border-dashed border-amber-200 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-amber-50 transition-colors min-h-[200px]"
            >
              <Plus className="h-8 w-8 text-amber-300 mb-2" />
              <p className="text-sm font-medium text-stone-500">
                {activeTab === 'Saved' ? 'Save a Recipe' : 'Submit a Recipe'}
              </p>
              <p className="text-xs text-stone-400 text-center mt-1">
                {activeTab === 'Saved' ? 'Browse and bookmark your favorites' : 'Share your own dish'}
              </p>
            </Link>
          </div>

          {/* View More */}
          {filteredRecipes.length >= 6 && (
            <div className="text-center mt-10">
              <button className="border border-amber-200 text-stone-600 px-6 py-2.5 rounded-lg text-sm hover:bg-amber-50 transition-colors">
                View More Saved Recipes
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Saved;