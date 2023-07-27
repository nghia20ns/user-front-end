/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";

const Login = () => {
  //  const [userState, setUserState] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [messageError, setMessageError] = useState("");
  const [isShowAlert, setIsShowAlert] = useState(false);
  const navigate = useNavigate();

  const getUsers = async () => {
    await axios
      .post("http://45.77.215.103/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "login admin") {
          localStorage.setItem("token", JSON.stringify(res));
          setIsAdmin(true);
        } else if (res.data.status === "login client") {
          localStorage.setItem("token", JSON.stringify(res));
          setIsClient(true);
        } else if (res.data.status === "not email") {
          setIsShowAlert(true);
          setMessageError(res.data.message);
        } else if (res.data.status === "lack info") {
          setIsShowAlert(true);
          setMessageError(res.data.message);
        } else if (res.data.status === "error password") {
          setIsShowAlert(true);
          setMessageError(res.data.message);
        } else if (res.data.status === "error email") {
          setIsShowAlert(true);
          setMessageError(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (isAdmin) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);
  useEffect(() => {
    if (isClient) {
      navigate("/home");
    }
  }, [isClient, navigate]);

  const loginFuc = (e) => {
    getUsers();
    e.preventDefault();
  };
  return (
    <>
      {isShowAlert && <Alert message={messageError} />}

      <div className="container">
        <div className=" text-center mt-5 ">
          <h1>Login</h1>
        </div>
        <div className="row ">
          <div className="col-lg-7 mx-auto">
            <div className="card mt-2 mx-auto p-4 bg-light">
              <div className="card-body bg-light">
                <div className="container">
                  <form id="contact-form" role="form" onSubmit={loginFuc}>
                    <div className="controls">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="form_name">Email *</label>
                            <input
                              id="form_name"
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Please enter your email *"
                              required="required"
                              data-error="email is required."
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input
                              id="password"
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Please enter your password *"
                              required="required"
                              data-error="password is required."
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-12">
                          <input
                            type="submit"
                            className="btn btn-success btn-send  pt-2 btn-block"
                            defaultValue="Login"
                          />
                        </div>
                        <hr></hr>
                        <div className="col-md-12">
                          <Link
                            to={"/signup"}
                            className="btn btn-success btn-send  pt-2 btn-block"
                            defaultValue="Send Message"
                          >
                            {" "}
                            Signup
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* /.8 */}
          </div>
          {/* /.row*/}
        </div>
      </div>
    </>
  );
};

export default Login;
