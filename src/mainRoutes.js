import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Feed from './pages/Feed.js';
import New from './pages/New.js';

function MainRoutes (){
    // console.log ("MainRoutes");
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Feed />}/>
                <Route path="/new" element={<New />}/>
            </Routes>
        </Router>
    );
}

export default MainRoutes;