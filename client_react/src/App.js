import React, { useState  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/LoginForm';
import NewsFeed from './components/NewsFeed';
import Navbar from './components/Navbar';
import Register from './components/SignupForm';
import NewsFeed2 from './components/NewsFeed2';

const App = () => {
    const [token, setToken] = useState('');
    
        // Clear sessionStorage when the page is refreshed
        sessionStorage.clear();


    return (
        
        <Router>
            <Navbar />
            
            <Routes>
                {/* Render Login if there's no token */}
                <Route path="/"  element={token ? <NewsFeed2 /> : <NewsFeed2 /> }/>

                {/* <Route path="/login" element={<Login setToken={setToken} />} /> */}
                
                <Route path="/signup" element={<Register setToken={setToken} />}  />
                

                {/* Render NewsFeed if there's a token, otherwise show Login */}
                <Route path="/news" element={token ? <NewsFeed /> :<Login setToken={setToken} />} />
            </Routes>
        </Router>
    );
};

export default App;
