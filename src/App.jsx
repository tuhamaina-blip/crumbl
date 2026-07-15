import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedProvider>
          <div className="min-h-screen flex flex-col bg-amber-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SavedProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;