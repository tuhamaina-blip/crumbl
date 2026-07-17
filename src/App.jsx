import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Submit from './pages/Submit';
import { RecipeProvider } from './context/RecipeContext';
import Register from './pages/Register';
import RecipeDetails from './pages/RecipeDetails';
import Saved from './pages/Saved';


function Layout() {

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<ProtectedRoute><Submit /></ProtectedRoute>} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><Submit /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {<Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedProvider>
          <RecipeProvider>
            <Layout />
          </RecipeProvider>
        </SavedProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;