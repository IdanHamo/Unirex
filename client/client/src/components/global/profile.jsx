import { useState, useEffect } from "react";
import crudService from "../../services/crudService.js";
import { useParams } from "react-router-dom";
import UploadImage from "../common/changeImage.jsx";

const Profile = () => {
  const params = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const { data } = await crudService.getFullUser(params.id);
      setUser(data);
    };
    getUser();
  }, []);

  return (
    <>
      {user && (
        <section className="vh-70">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-lg-6 mb-4 mb-lg-0">
                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                  <div className="row g-0">
                    <div className="col-md-4 gradient-custom text-center">
                      <img
                        src={
                          user.image
                            ? user.image
                            : "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="
                        }
                        alt="Avatar"
                        className="img-fluid mt-5"
                        style={{ width: "80px" }}
                      />
                      <UploadImage
                        url="/users/changeImage"
                        formDataName="profile"
                        id={user._id}
                      ></UploadImage>
                      <h5>{user.userName}</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{user.email}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Premium</h6>
                            <p className="text-muted">
                              {user.premium ? "true" : "false"}
                            </p>
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Created at</h6>
                            <p className="text-muted">{user.createdAt}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>favorites</h6>
                            <p className="text-muted">
                              {user.favorites && user.favorites.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
