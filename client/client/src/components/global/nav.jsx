import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
const Nav = () => {
  const { user } = useAuth();
  const navbar = ["Home", "About", "Contact", "Recipes"];
  const action = ["Register", "Login", "Premium"];

  return (
    <nav
      className="navbar navbar-expand-md navbar-light bg-white"
      aria-label="Eighth navbar example"
    >
      <div className="container">
        <Link className="navbar-brand mr-5" to="home">
          <img className="nav-img" src="images/white-logo.png" alt="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample07">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            {navbar.map((link) => (
              <li key={link} className="nav-item">
                <NavLink className="nav-link py-3" to={link}>
                  {link}
                </NavLink>
              </li>
            ))}
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link py-3" to="/favorites">
                  Favorites
                </NavLink>
              </li>
            )}
            {user?.premium && (
              <li className="nav-item">
                <NavLink className="nav-link py-3" to="/myRecipes">
                  My recipes
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Sign Out
                </NavLink>
              </li>
            ) : (
              action.map((link) => (
                <li key={link} className="nav-item">
                  <NavLink className="nav-link py-4" to={link}>
                    {link}
                  </NavLink>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
