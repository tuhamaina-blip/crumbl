import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-stone-50 px-6 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-2xl shadow-xl border border-stone-200 bg-white">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-amber-500 text-white p-12">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Crumbl
          </h1>

          <p className="text-amber-100 leading-7">
            Discover delicious recipes, save your favorites, and share your own
            creations with food lovers from around the world.
          </p>

          <div className="mt-10">
            <div className="h-1 w-20 rounded-full bg-white/70"></div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-stone-900">
            Create Account
          </h2>

          <p className="mt-2 text-stone-500">
            Join Crumbl and start saving and sharing recipes.
          </p>

          <form className="mt-8 space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-stone-300 py-3 pl-12 pr-4 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-stone-300 py-3 pl-12 pr-4 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-stone-300 py-3 pl-12 pr-4 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-stone-300 py-3 pl-12 pr-4 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 accent-amber-500"
              />

              <p className="text-sm text-stone-600">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Terms & Conditions
                </a>
              </p>
            </div>

            {/* Button */}
            <button
              className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="mt-8 text-center text-stone-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-amber-600 hover:text-amber-700"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Register;