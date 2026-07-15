import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function Layout() {

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
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
          <Layout />
        </SavedProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;