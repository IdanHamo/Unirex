import "./App.css";
import Footer from "./components/global/footer";
import Home from "./components/global/home";
import Nav from "./components/global/nav";
import { Routes, Route } from "react-router-dom";
import About from "./components/global/about";
import Contact from "./components/global/contact";
import Recipes from "./components/global/recipes";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import PremiumRegistration from "./components/authentication/registerPremium";
import Logout from "./components/authentication/logout";
import MyRecipes from "./components/premium/myRecipes";
import CreateRecipe from "./components/crud/createRecipe";
import DeleteRecipe from "./components/crud/deleteCard";
import FullRecipe from "./components/crud/fullRecipe";
import EditRecipe from "./components/crud/editRecipe";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRouth";
import ProtectedRouteOnline from "./components/common/protectedRouthOnline";
import Favorites from "./components/global/favorites";
import ProtectedRouteOffline from "./components/common/protectedRouthOffline";
import Profile from "./components/global/profile";
import ResetPassword from "./components/global/resetPassword";
import ResetPasswordConfirm from "./components/global/reserPasswordConfirm";
import Admin from "./components/admin/admin";
import ProtectedRouteAdmin from "./components/common/protectedRouthAdmin";
import UserContacts from "./components/admin/usersContacts";
import FullContact from "./components/admin-contact-crud/fullContact";
import DeleteContact from "./components/admin-contact-crud/deleteContact";
import MostFavorite from "./components/admin/mostFav";

function App() {
  return (
    <>
      <div className="App d-flex flex-column min-vh-100">
        <ToastContainer></ToastContainer>
        <header>
          <Nav />
        </header>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route
              path="/recipes"
              element={
                <div className="container">
                  <Recipes></Recipes>
                </div>
              }
            ></Route>
            <Route
              path="/admin"
              element={
                <div className="container">
                  <ProtectedRouteAdmin admin>
                    <Admin></Admin>
                  </ProtectedRouteAdmin>
                </div>
              }
            ></Route>
            <Route
              path="/usersContacts"
              element={
                <div className="container">
                  <ProtectedRouteAdmin admin>
                    <UserContacts></UserContacts>
                  </ProtectedRouteAdmin>
                </div>
              }
            ></Route>
            <Route
              path="/usersContacts/contact/:id"
              element={
                <div className="container">
                  <ProtectedRouteAdmin admin>
                    <FullContact></FullContact>
                  </ProtectedRouteAdmin>
                </div>
              }
            ></Route>
            <Route
              path="/usersContacts/delete/:id"
              element={
                <div className="container">
                  <ProtectedRouteAdmin admin>
                    <DeleteContact></DeleteContact>
                  </ProtectedRouteAdmin>
                </div>
              }
            ></Route>
            <Route
              path="/favorites"
              element={
                <div className="container">
                  <ProtectedRouteOnline>
                    <Favorites></Favorites>
                  </ProtectedRouteOnline>
                </div>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <ProtectedRouteOffline>
                  <Register></Register>
                </ProtectedRouteOffline>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <ProtectedRouteOffline>
                  <Login></Login>
                </ProtectedRouteOffline>
              }
            ></Route>
            <Route
              path="/resetPassword"
              element={
                <ProtectedRouteOffline>
                  <ResetPassword></ResetPassword>
                </ProtectedRouteOffline>
              }
            ></Route>
            <Route
              path="/resetPassword/:token"
              element={
                <ProtectedRouteOffline>
                  <ResetPasswordConfirm></ResetPasswordConfirm>
                </ProtectedRouteOffline>
              }
            ></Route>
            <Route
              path="/logout"
              element={
                <ProtectedRouteOnline>
                  <Logout redirect="/login"></Logout>
                </ProtectedRouteOnline>
              }
            ></Route>
            <Route
              path="/users/me/:id"
              element={
                <ProtectedRouteOnline>
                  <Profile></Profile>
                </ProtectedRouteOnline>
              }
            ></Route>
            <Route
              path="/premium"
              element={
                <ProtectedRouteOffline>
                  <PremiumRegistration></PremiumRegistration>
                </ProtectedRouteOffline>
              }
            ></Route>
            <Route
              path="/myRecipes"
              element={
                <ProtectedRoute prem>
                  <MyRecipes></MyRecipes>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/createRecipe"
              element={
                <ProtectedRoute prem>
                  <CreateRecipe></CreateRecipe>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/cards/delete/:id"
              element={
                <ProtectedRoute prem>
                  <DeleteRecipe></DeleteRecipe>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/cards/fullRecipe/:id"
              element={
                <div className="container">
                    <FullRecipe></FullRecipe>
                </div>
              }
            ></Route>
            <Route
              path="/cards/editRecipe/:id"
              element={
                <ProtectedRoute prem>
                  <EditRecipe></EditRecipe>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/mostFavorite"
              element={
                <ProtectedRouteAdmin admin>
                  <div className="container">
                    <MostFavorite></MostFavorite>
                  </div>
                </ProtectedRouteAdmin>
              }
            ></Route>
          </Routes>
        </div>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
}

export default App;
