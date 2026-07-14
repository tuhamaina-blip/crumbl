import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-0">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-amber-500" />
            Crumbl
          </h3>
          <p className="text-sm text-stone-400 leading-relaxed">
            A cozy place to discover, share, and save your favorite recipes from around the world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li><Link to="/recipes" className="hover:text-amber-400 transition-colors">Recipes</Link></li>
            <li><Link to="/saved" className="hover:text-amber-400 transition-colors">Saved</Link></li>
            <li><Link to="/submit" className="hover:text-amber-400 transition-colors">Submit a Recipe</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-amber-400 transition-colors">Sign In</Link></li>
            <li><Link to="/register" className="hover:text-amber-400 transition-colors">Register</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-700 text-center py-4 text-xs text-stone-500">
        <p>© {new Date().getFullYear()} Crumbl. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;