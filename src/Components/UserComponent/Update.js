/* eslint-disable jsx-a11y/no-redundant-roles */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert";

const Update = () => {
  const [password, setPassword] = useState("");
  const [emailRecover, setEmailRecover] = useState("");
  const [infoState, setInfoState] = useState({});
  const [isMessage, setIsMassage] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const { id } = useParams();

  const getUsers = async () => {
    await axios
      .get("http://localhost:5000/user/" + id)
      .then((res) => {
        setInfoState(res.data.data);
        if (res.data.status === "error") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const updateUser = async () => {
    await axios
      .patch("http://localhost:5000/user/userUpdate/" + id, {
        password: password,
        email_recover: emailRecover,
      })
      .then((res) => {
        if (res.data.status === "update ok") {
          setIsAlert(true);
          setIsMassage("update successful");
          navigate(-1);
        } else if (res.data.status === "email already exists") {
          setIsAlert(true);
          setIsMassage(res.data.message);
        } else if (res.data.status === "error") {
          setIsAlert(true);
          setIsMassage(res.data.message);
        } else if (res.data.status === "error email") {
          setIsAlert(true);
          setIsMassage(res.data.message);
        }
        console.log("status:", res.data.status);
        console.log("message:", res.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateFuc = (e) => {
    // e.preventDefault();
    // console.log(e);
    updateUser();
  };
  const navigate = useNavigate();
  return (
    <>
      {isAlert && <Alert message={isMessage} />}

      <form id="contact-form" role="form" onSubmit={updateFuc}>
        <div className="controls">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="form_name">
                  <b>Email</b>
                </label>
                <input
                  id="form_name"
                  type="text"
                  className="form-control"
                  placeholder={infoState.email}
                  value={infoState.email}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="form_email">
                  <b>Email Recover</b>
                </label>
                <input
                  id="email_recover"
                  type="text"
                  className="form-control"
                  placeholder={
                    infoState.email_recover !== " "
                      ? infoState.email_recover
                      : "Please enter your email recover"
                  }
                  value={emailRecover}
                  onChange={(e) => setEmailRecover(e.target.value)}
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
                  placeholder={infoState.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required="required"
                  data-error="Please fill in this field."
                />
              </div>
            </div>
          </div>
          <hr></hr>
            <div className="col-md-12">
              <input
                type="submit"
                className="btn btn-success btn-send  pt-2 btn-block
                      "
                defaultValue="Send Message"
              />
            </div>
          </div>
      </form>

      <Link onClick={() => navigate(-1)} className="card-link">
        Back
      </Link>
    </>
  );
};

export default Update;
