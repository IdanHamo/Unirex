import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import crudService from "../../services/crudService.js";

const Nav = () => {
  const navbar = ["Home", "About", "Contact", "Recipes"];
  const action = ["Register", "Login", "Premium"];
  const [fullUser, setFullUser] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await crudService.getUserById(user);
      setFullUser(data);
    };
    getUser();
  }, [user]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white"
      aria-label="Eighth navbar example"
    >
      <div className="container">
        <Link className="navbar-brand mr-5" to="home">
          <img className="nav-img" src="images/footer.png" alt="logo" />
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
            {fullUser.admin && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link py-3" to="/admin">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link py-3" to="/usersContacts">
                    Contacts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link py-3" to="/mostFavorite">
                    most favorite
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {fullUser && (
                    <div>
                      <img
                        src={
                          fullUser.image
                            ? fullUser.image
                            : "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="
                        }
                        alt="avatar"
                        className="navbar-avatar"
                      />
                      <span>{fullUser.userName}</span>
                    </div>
                  )}
                </button>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <NavLink to={`/users/me/${user._id}`} className="nav-link">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/logout" className="nav-link">
                      Sign Out
                    </NavLink>
                  </li>
                </ul>
              </div>
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
