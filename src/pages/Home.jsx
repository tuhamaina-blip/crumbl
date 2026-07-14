import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-24 px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-amber-400 mb-4">Welcome to Crumbl</p>
        <h1 className="text-5xl font-bold tracking-tight mb-6">Recipes Made with Love</h1>
        <p className="text-stone-400 text-lg max-w-xl mx-auto mb-8">
          Discover, share, and save your favorite recipes from home cooks and food lovers around the world.
        </p>
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