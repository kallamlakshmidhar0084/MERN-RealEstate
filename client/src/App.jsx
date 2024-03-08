import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";

import SignUp from "./pages/SignUp.jsx";

import Search from "./pages/Search.jsx";
import Navbar from "./components/Navbar.jsx"

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/home" exact Component={Home} />
          <Route path="/sign-in" exact Component={SignIn} />
          <Route path="/about" exact Component={About} />
          <Route path="/signUp" exact Component={SignUp} />
          <Route path="/search" exact Component={Search} />
        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;