import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search } from 'lucide-react';

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipes?search=${query}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-24 px-6 text-center">
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
      </section>

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
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
  )
}

export default Home