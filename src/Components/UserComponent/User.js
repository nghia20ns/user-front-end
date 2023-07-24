import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import UserItem from "./UserItem";
import ReactPaginate from "react-paginate";
import "../css/manager.css";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [userState, setUserState] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const navigate = useNavigate();

  const refreshToken =async (token)=>{
    try {
      const res = await axios.get(
        "http://localhost:5000/user/refreshToken/",
        {
          headers: {
            Authorization: `Bearer ${token.data.data.refresh_token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "please login") {
          navigate("/")
        }
        if (res.data.status === "token expried") {
          navigate("/")
        }else {
          console.log(res.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    } catch (error) {
      
    }
  }
  const getUsers = async (page, token) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/user/getUser/${page}`,
        {
          headers: {
            Authorization: `Bearer ${token.data.data.access_token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "please login") {
          navigate("/")
        }
        if (res.data.status === "token expried") {
          // refreshToken(token)
        }else {
          setUserState(res.data.data);
          // setTotalPage(res.data.data.length % 5);
          setTotalPage(res.data.page);    
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));

      getUsers(1, token);
    }
    else{
      navigate("/")
    }
  }, []);
  const handlePageClick = (event) => {
    getUsers(event.selected + 1, JSON.parse(localStorage.getItem("token")));
  };

  //xu ly cong
  const btnAdd = () => {
    navigate("/users/add");
  };

  return (
    <>
      <div style={{ height: 500 }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          <tbody>
            {userState.map((user) => {
              return <UserItem key={user._id} userProps={user} />;
            })}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <div className="app">
        <button className="add-button" onClick={btnAdd}>
          +
        </button>
      </div>
    </>
  );
};

export default memo(User);
