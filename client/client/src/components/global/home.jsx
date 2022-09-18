import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useState } from "react";
import { useEffect } from "react";
import adminCrud from "../../services/adminCrud";
import crudService from "../../services/crudService";

const Home = () => {
  const { user } = useAuth();

  const [subscribers, setSubscribers] = useState(null);
  const [customRecipes, setCustomRecipes] = useState(null);

  useEffect(() => {
    const getSubscribers = async () => {
      const response = await adminCrud.getAllUsers();
      setSubscribers(response.data.length);
    };
    getSubscribers();
  }, [subscribers]);

  useEffect(() => {
    const getSubscribers = async () => {
      const response = await crudService.getAllCards();
      setCustomRecipes(response.data.length);
    };
    getSubscribers();
  }, [customRecipes]);
  return (
    <div>
      <img className="w-100" src="images/headerHome.jpg" alt="food" />

      <div className="services w-100 my-5 d-flex flex-column justify-content-center text-center">
        <div className="container">
          <div className="titles mb-5">
            <h1 className="mb-4">Welcome to Unirex</h1>
            <h4>Food platform that allows easy and comfortable search</h4>
          </div>
          <div className="text-center">
            <h3 className="section-heading mb-5">Our Services</h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4 text-center">
              <i className="bi bi-bookmarks-fill h1 text-primary"></i>
              <h4 className="my-3">Edamam API</h4>
              <p className="text-muted">
                To give you the best experience and the most comfortable way to
                search your desire recipes.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-server h1 text-warning"></i>
              <h4 className="my-3">Create your own recipes</h4>
              <p className="text-muted">
                If you have a good recipe and you want to save or share with
                others, this is good platform for you.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <i className="bi bi-heart-fill text-danger h1"></i>
              <h4 className="my-3">Save your favorites</h4>
              <p className="text-muted">
                Did you find a recipe that you like? Great! Add the recipe to
                your favorites, it will be easier to find it again next time.
              </p>
            </div>
          </div>
        </div>
        <hr className="home-hr my-5" />

        <div className=" d-flex justify-content-around align-items-center container">
          <div className="home-info bg-light col-4">
            <h3 className="h1">{subscribers}</h3>
            <div>subscribers</div>
          </div>
          <div className="home-info bg-info col-4">
            <h3 className="h1 text-white">{customRecipes}</h3>
            <div className="text-white">custom recipes</div>
          </div>
        </div>
      </div>

      {!user && (
        <>
          <hr className="home-hr my-5" />
          <div className="mt-5 text-center d-block">
            <h3 className="section-heading mb-5">Don't hesitate and join us</h3>
            <span className="m-3">
              <Link
                className="home-links  bg-primary p-3 text-white"
                to="/register"
              >
                Register
              </Link>
            </span>
            <span className="m-3">
              <Link
                className="home-links  bg-primary text-white p-3"
                to="/login"
              >
                Login
              </Link>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
