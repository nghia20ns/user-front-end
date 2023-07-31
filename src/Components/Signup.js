import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isMessage, setIsMassage] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const navigate = useNavigate();
  const createUser = async () => {
    await axios
      .post("http://45.77.215.103/api/user/signup", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.status === "sign success") {
          setIsAlert(true);
          setIsMassage("created");
          navigate("/users");
        } else if (res.data.status === "error email") {
          setIsAlert(true);
          setIsMassage(res.data.message);
        } else if (res.data.status === "email existed") {
          setIsAlert(true);
          setIsMassage(res.data.message);
        }
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createFunc = (e) => {
    e.preventDefault();
    console.log(e);
    createUser();
  };

  return (
    <>
      {isAlert && <Alert message={isMessage} />}
      {/* eslint-disable-next-line */}
      <form id="contact-form" role="form" onSubmit={createFunc}>
        <div className="controls">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="form_email">
                  <b>Email</b>
                </label>
                <input
                  id="email_recover"
                  type="text"
                  className="form-control"
                  placeholder="Please enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required="required"
                  data-error="Please fill in this field."
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="form_email">
                  <b>Password</b>
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required="required"
                  data-error="Please fill in this field."
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <input
                type="submit"
                className="btn btn-success btn-send  pt-2 btn-block
                      "
                defaultValue="Send Message"
              />
            </div>
            <div className="col-md-4">
              <Link onClick={() => navigate(-1)} className="card-link">
                Back
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Signup;
