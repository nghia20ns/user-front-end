import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import ReactPaginate from "react-paginate";
import "../css/product.css";

const Product = () => {
  const [productSate, setProductState] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const getProduct = async (page, token, search) => {
    try {
      if (search) {
        await axios
          .get(
            `http://45.77.215.103/api/product/getall/${page}?search=${search}`,
            {
              headers: {
                Authorization: `Bearer ${token.data.data.access_token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.status === "please login") {
              navigate("/");
            }
            if (res.data.status === "token expired") {
              navigate("/");
            } else {
              setProductState(res.data.data);
              setTotalPage(res.data.page);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        await axios
          .get(`http://45.77.215.103/api/product/getall/${page}`, {
            headers: {
              Authorization: `Bearer ${token.data.data.access_token}`,
            },
          })
          .then((res) => {
            if (res.data.status === "please login") {
              navigate("/");
            }
            if (res.data.status === "token expired") {
              navigate("/");
            } else {
              setProductState(res.data.data);
              setTotalPage(res.data.page);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));

      getProduct(1, token, searchInput);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);
  const handlePageClick = (event) => {
    getProduct(event.selected + 1, JSON.parse(localStorage.getItem("token")));
  };

  //xu ly cong
  const btnAdd = () => {
    navigate("/products/add");
  };
  // const searchFunc = (event) => {
  //   event.preventDefault();
  //   if (JSON.parse(localStorage.getItem("token"))) {
  //     const token = JSON.parse(localStorage.getItem("token"));

  //     getProduct(1,token, searchInput);
  //   }
  // };
  return (
    <>
      <div className="row">
        <div className="input-group mb-3">
          <form className="search-form">
            <input
              type="text"
              id="searchInput"
              name="search"
              placeholder="find..."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </form>
        </div>
      </div>
      <div className="row">
        <div style={{ height: 500 }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Provider</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {productSate.map((product) => {
                return <ProductItem key={product._id} productProps={product} />;
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
      </div>
    </>
  );
};

export default Product;
