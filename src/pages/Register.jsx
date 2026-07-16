import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UtensilsCrossed, Eye, EyeOff } from 'lucide-react';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // accountType: 'Home Cook',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!agreed) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const fakeToken = 'crumbl-token-123';
      const fakeUser = {
        id: 'u2',
        email: formData.email,
        name: formData.name,
        accountType: formData.accountType,
      };
      register(fakeToken, fakeUser);
      navigate('/login');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* Left — Image Side */}
      <div className="hidden md:block relative">
        <div className="h-full">
          <img src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-stone-900/50 flex flex-col justify-end p-10 text-white">
          <h2 className="text-4xl font-bold mb-3">Start your culinary <span className="text-amber-400">legacy</span> today.</h2>
          <p className="text-stone-300 text-sm max-w-sm">Join a community of home cooks and food lovers sharing the world's most cherished recipes.</p>
        </div>
      </div>

      {/* Right — Form Side */}
      <div className="flex items-center justify-center px-6 py-12 bg-amber-50">
        <div className="w-full max-w-sm">

          {/* Brand */}
          <div className="flex items-center gap-2 mb-6">
            <UtensilsCrossed className="h-6 w-6 text-amber-500" />
            <span className="text-lg font-bold text-stone-800">Crumbl</span>
          </div>

          <h2 className="text-2xl font-bold mb-1 text-stone-800">Create your account</h2>
          <p className="text-stone-400 text-sm mb-6">Share, discover, and organize your favorite recipes.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-amber-200 rounded-xl p-6 shadow-sm">
            <div>
              <label className="text-sm font-medium block mb-1.5 text-stone-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border border-amber-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-stone-800"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5 text-stone-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-amber-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-stone-800"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5 text-stone-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full border border-amber-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-stone-800 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Account Type
            <div>
              <label className="text-sm font-medium block mb-1.5 text-stone-700">Account Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Home Cook', 'Professional'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, accountType: type })}
                    className={`py-2 rounded-lg text-sm border transition-colors ${
                      formData.accountType === type
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white text-stone-600 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    {type === 'Home Cook' ? '🍳' : '👨‍🍳'} {type}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="agreed"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-amber-500"
              />
              <label htmlFor="agreed" className="text-xs text-stone-500">
                I agree to the{' '}
                <a href="#" className="text-amber-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p className="text-sm text-center text-stone-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;