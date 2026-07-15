import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UtensilsCrossed, Eye, EyeOff } from 'lucide-react';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const fakeToken = 'crumbl-token-123';
      const fakeUser = { id: 'u1', email: formData.email, name: formData.email.split('@')[0] };
      login(fakeToken, fakeUser);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left — Image Side */}
      <div
        className="hidden md:block bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800')`
        }}
      >
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
          <UtensilsCrossed className="h-8 w-8 text-amber-400 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Welcome back to Crumbl</h2>
          <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
            Sign in to access your saved recipes, submit new dishes, and connect with a community of food lovers.
          </p>
        </div>
      </div>

      {/* Right — Form Side */}
      <div className="flex items-center justify-center px-6 py-12 bg-amber-50">
        <div className="w-full max-w-sm">

          {/* Mobile brand */}
          <div className="flex items-center gap-2 mb-8 md:hidden">
            <UtensilsCrossed className="h-6 w-6 text-amber-500" />
            <span className="text-xl font-bold text-stone-800">Crumbl</span>
          </div>

          <h2 className="text-2xl font-bold mb-1 text-stone-800">Sign in</h2>
          <p className="text-stone-400 text-sm mb-8">Enter your credentials to continue</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
            <div>
              <label className="text-sm font-medium block mb-1.5 text-stone-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-amber-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50 text-stone-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-stone-700">Password</label>
                <a href="#" className="text-xs text-amber-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full border border-amber-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50 text-stone-800 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-sm text-center text-stone-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;