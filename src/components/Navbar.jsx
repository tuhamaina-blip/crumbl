import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { BookMarked, LogOut, User, UtensilsCrossed } from 'lucide-react';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="border-b border-amber-200 bg-amber-50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Brand */}
        <Link to="/" className="text-xl font-bold tracking-tight text-stone-800 flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-amber-500" />
          Crumbl
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-stone-600">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <Link to="/recipes" className="hover:text-amber-600 transition-colors">Recipes</Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/saved" className="flex items-center gap-1 hover:text-amber-600">
                <BookMarked className="h-4 w-4" />
                Saved
              </Link>
              <Link to="/submit" className="bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600 transition-colors">
                + Submit Recipe
              </Link>
              <span className="flex items-center gap-1 text-stone-600 text-xs">
                <User className="h-4 w-4" />
                {user?.name}
              </span>
              <button onClick={logout} className="flex items-center gap-1 hover:text-amber-600">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="hover:text-amber-600">Sign In</Link>
              <Link to="/register" className="bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;