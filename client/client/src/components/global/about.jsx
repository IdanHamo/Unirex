import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div
        className="position-relative overflow-hidden p-3 p-md-5  text-center"
        style={{
          backgroundImage: "url(images/about.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weight-normal text-black">
            <strong>About Unirex</strong>
          </h1>
        </div>
        <div className="product-device box-shadow d-none d-md-block"></div>
        <div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
      </div>
      <div className="container my-5 d-flex flex-column justify-content-center align-items-center">
        <div className="col-xxl-10 justify-content-center">
          <div className="card flex-md-row mb-4 box-shadow h-md-250 bg-light">
            <div className="card-body d-flex flex-column align-items-start bg-light">
              <h3 className="mb-0">Premium account</h3>
              <p className="card-text mb-auto">
                Create premium account give you the option to create your own
                recipes. Every Recipe you create shown to everybody else when
                they search the name of the product.
                <br></br>
                exp: If my recipe's name is Burger, then all the logged in
                accounts that search "Burger" will find the recipe under the
                "Other Users recipes" on page "Recipes"
              </p>
              <Link className="text-info" to="/Premium">
                Register as premium
              </Link>
            </div>
            <img
              className="card-img-right flex-auto d-none d-md-block p-4"
              alt="premium logo"
              src="images/premium.png"
              style={{ width: "180px", height: "100%" }}
            />
          </div>
        </div>
        <div className="col-xxl-10 justify-content-center">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <h3 className="mb-0">Our platform</h3>
              <p className="card-text mb-auto">
                Our platform is a good tool to find fast and several options to
                your search word. And if you find something that you like, you
                can easily mark it as favorite. All of you favorites you can
                find under the tab "favorites".
              </p>
            </div>
            <img
              className="card-img-right flex-auto d-none d-md-block p-4"
              alt="Unirex logo"
              src="images/signup.jpg"
              style={{ width: "180px", height: "100%" }}
            />
          </div>
        </div>
        <div className="col-xxl-10 justify-content-center">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <h3 className="mb-0">Edamam API</h3>
              <p className="card-text mb-auto">
                Edamam contain great amount of recipes of any kind, from all
                over the world. Give you the details about the calories and
                more.
              </p>
            </div>
            <img
              className="card-img-right flex-auto d-none d-md-block p-4"
              alt="edamam logo"
              src="images/api.png"
              style={{ width: "180px", height: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
