import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedProvider>
          <div className="min-h-screen flex flex-col">
            <h1>Crumbl</h1>
          </div>
        </SavedProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;