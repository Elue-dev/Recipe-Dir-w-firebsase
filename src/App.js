import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'
import Navbar from './components/navbar/Navbar';
import ThemeSelector from './components/theme selector/ThemeSelector';
import ProtectedRoute from './components/protected route/ProtectedRoute';
import Login from './pages/login/Login';
import { useTheme } from './context/ThemeContext';
import SignUp from './pages/signup/SignUp';
import Searchbar from './components/search bar/Searchbar';
import ForgotPassword from './pages/forgot password/ForgotPassword';
import Welcome from './components/welcome/Welcome';

export default function App() {

  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <Welcome />
        <ThemeSelector />
        {/* <Searchbar /> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/create' element={<ProtectedRoute><Create /> </ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/recipes/:id' element={<Recipe />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}
