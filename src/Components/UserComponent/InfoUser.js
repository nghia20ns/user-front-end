import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/Login.css";
import axios from "axios";
const InfoUser = () => {
  const { id } = useParams();
  const [infoState, setInfoState] = useState({});
  const [apikey, setApikey] = useState("");

  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUsers = async () => {
    await axios
      .get("http://45.77.215.103/api/user/" + id)
      .then((res) => {
        setInfoState(res.data.data);
        setApikey(res.data.data.api_key);
        if (res.data.status === "error") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteUser = async () => {
    await axios
      .delete("http://45.77.215.103/api/user/delete/" + id)
      .then((res) => {
        setInfoState(res.data.data);
        if (res.data.status === "err") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFunc = () => {
    const result = window.confirm("Are you sure you want to delete?");

    if (result) {
      console.log("deleted");
      deleteUser();
      navigate(-1);
    }
  };
  const changeApiKey = async () => {
    const res = await axios.patch(
      "http://45.77.215.103/api/user/changeApiKey/" + id
    );
    setApikey(res.data.data.data.api_key);
  };
  const btnChange = () => {
    const result = window.confirm("Are you sure you want to change Api Key?");
    if (result) {
      changeApiKey();
    }
  };

  return (
    <>
      <div className="row">
        <div className="col sm 5">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{infoState.information}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Email:</b> {infoState.email}{" "}
              </li>
              <li className="list-group-item">
                <b>Email Recover:</b>{" "}
                {infoState.email_recover !== " "
                  ? infoState.email_recover
                  : "none"}{" "}
              </li>
            </ul>
            <div className="card-body">
              <Link to={`/users/update/${id}`} className="card-link">
                Update
              </Link>
              <Link onClick={deleteFunc} className="card-link">
                Delete
              </Link>
              <Link onClick={() => navigate(-1)} className="card-link">
                Back
              </Link>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Email:</b>
            </li>
            <li className="list-group-item">
              <b>Password:</b>
            </li>
            <li className="list-group-item">
              <b>Api_key:</b>
            </li>
          </ul>
        </div>

        <div className="col-sm-4">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{infoState.email}</li>
            <li className="list-group-item">{infoState.password}</li>
            <li className="list-group-item">{apikey}</li>
            <button type="submit" onClick={btnChange} className="btn btn-link">
              {" "}
              change API key
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};
export default memo(InfoUser);
