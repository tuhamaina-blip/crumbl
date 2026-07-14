import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedProvider>
          <div className="min-h-screen flex flex-col bg-amber-50">
            <Navbar />
            <main className="flex-1">
              <h1 className="text-center py-20 text-stone-800">Coming soon...</h1>
            </main>
            <Footer />
          </div>
        </SavedProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;