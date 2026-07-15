import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '@/components/RecipeCard';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const categoryMap = {
  Breakfast: 'breakfast',
  Lunch: 'salad,soup,appetizer',
  Dinner: 'main course',
  Dessert: 'dessert',
};

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    setLoading(true);

    const mealType = selectedCategory !== 'All'
      ? `&type=${categoryMap[selectedCategory] || selectedCategory.toLowerCase()}`
      : '';

    const query = searchTerm ? `&query=${searchTerm}` : '&query=chicken';

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=20&addRecipeInformation=true${query}${mealType}`
    )
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.results.map((meal) => ({
          id: meal.id,
          title: meal.title,
          category: selectedCategory !== 'All' ? selectedCategory : meal.dishTypes?.[0] || 'General',
          description: meal.summary?.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
          image: meal.image,
          prepTime: `${meal.preparationMinutes > 0 ? meal.preparationMinutes : 15} mins`,
          cookTime: `${meal.cookingMinutes > 0 ? meal.cookingMinutes : 30} mins`,
          servings: meal.servings,
          difficulty: meal.readyInMinutes <= 30 ? 'Easy' : meal.readyInMinutes <= 60 ? 'Medium' : 'Hard',
          author: meal.sourceName || 'Spoonacular',
        }));
        setRecipes(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load recipes.');
        setLoading(false);
      });
  }, [searchTerm, selectedCategory]);

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];

  const handleSearch = (e) => {
    setSearchParams({ search: e.target.value, category: selectedCategory });
  };

  const handleCategory = (category) => {
    setSearchParams({ search: searchTerm, category });
  };

  if (loading) return <p className="text-center py-20 text-stone-500">Loading recipes...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">All Recipes</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-amber-200 rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                selectedCategory === category
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-stone-600 border-amber-200 hover:bg-amber-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {recipes.length === 0 ? (
        <p className="text-center text-stone-400 py-20">No recipes match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;