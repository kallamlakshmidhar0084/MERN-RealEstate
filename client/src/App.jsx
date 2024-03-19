import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx"

import SignUp from "./pages/SignUp.jsx";
import Search from "./pages/Search.jsx";
import Navbar from "./components/Navbar.jsx"
import CreateListing from "./pages/CreateListing.jsx";
import UpdateListing from "./pages/UpdateListing.jsx";
import Listing from "./pages/Listing.jsx";
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
          <Route path="/sign-up" exact Component={SignUp} />
          <Route path="/search" exact Component={Search} />
          <Route path="/search" exact Component={Search} />
          <Route path="/listing/:listingId" exact Component={Listing} />
          <Route element={<PrivateRoute/>}>
          <Route path="/profile" exact Component={Profile} />
          <Route path="/create-listing" exact Component={CreateListing}/>
          <Route path="/update-listing/:listingId" exact Component={UpdateListing}/>

          </Route>

        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;