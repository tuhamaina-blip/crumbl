import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Clock, Users } from 'lucide-react';

function Home() {
  const [query, setQuery] = useState('');
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/recipes.json')
      .then((res) => res.json())
      .then((data) => {
        const categories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts'];
        const picks = categories.map((cat) =>
          data.find((r) => r.category === cat)
        ).filter(Boolean);
        setFeatured(picks);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipes?search=${query}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white py-24 px-6 text-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        >
        <div className="absolute inset-0 bg-stone-900/70" />
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-widest text-amber-400 mb-4">Welcome to Crumbl</p>
          <h1 className="text-5xl font-bold tracking-tight mb-6">Recipes Made with Love</h1>
          <p className="text-stone-400 text-lg max-w-xl mx-auto mb-8">
            Discover, share, and save your favorite recipes from home cooks and food lovers around the world.
          </p>

        {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto gap-2 mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="bg-white flex-1 px-4 py-3 rounded-md text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 transition-colors px-4 py-3 rounded-md"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <div className="flex gap-4 justify-center">
            <Link
              to="/recipes"
              className="bg-amber-500 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-600 transition-colors"
            >
              Browse Recipes
            </Link>
            <Link
              to="/register"
              className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-stone-900 transition-colors"
            >
              Join Crumbl
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Featured Recipes</h2>
          <p className="text-stone-400 text-sm mb-8">A taste of what's cooking across every category.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="border border-amber-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white group"
              >
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {recipe.category}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-stone-800 text-sm mb-2 line-clamp-1">{recipe.title}</h3>
                  <div className="flex gap-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {recipe.servings} servings
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-stone-800">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Breakfast', 'Lunch', 'Dinner', 'Desserts'].map((category) => (
            <Link
              key={category}
              to={`/recipes?category=${category}`}
              className="border border-amber-200 rounded-lg p-6 text-center hover:bg-amber-100 transition-colors"
            >
              <p className="font-medium text-stone-700">{category}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-stone-800">Have a Recipe to Share?</h2>
        <p className="text-stone-500 mb-6">Join our community and share your favorite dishes with the world.</p>
        <Link
          to="/submit"
          className="bg-amber-500 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-600 transition-colors"
        >
          Submit a Recipe
        </Link>
      </section>
    </div>
  );
}

export default Home;