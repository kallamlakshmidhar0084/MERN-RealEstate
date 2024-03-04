import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";

import SignUp from "./pages/SignUp.jsx";

import Search from "./pages/Search.jsx";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={ <Home/> }/>
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/about' element={<About />} />
      <Route path='/search' element={<Search />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;