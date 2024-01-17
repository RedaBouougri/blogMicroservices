import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PostList from './Component/PostList';
import Login from './Component/login';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import PostAdd from './Component/PostAdd';
import NavBar from './Component/header';
import SignIn from './Component/register';
import PostUpdate from './Component/postUpdate';
import About from './Component/about';
import MyPost from './Component/MyPost';
import PersonalProfile from './Component/profile';
import PostDetails from './Component/PostDetails';

function App() {
  function AppHeader() {
  

    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const isRegisterPage = location.pathname === '/register';
    if (isLoginPage||isRegisterPage) {
      return null; // Don't render the header on the login page
    }
  
    return <NavBar/>;
  }
  return (
    <Router>
      <div className="App">
      <AppHeader/>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignIn />} />

          <Route element={<ProtectedRoute />} >
            <Route path="/listpost" element={<PostList />} />
            <Route path="/addPost" element={<PostAdd/>} />
            <Route path="/editPost/:id" element={<PostUpdate />} />
            <Route path="/details/:id" element={<PostDetails />} />

            <Route path="/aboutPost" element={<About />} />
            <Route path="/MyPost" element={<MyPost />} />
            <Route path="/profile" element={<PersonalProfile />} />


          </Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
