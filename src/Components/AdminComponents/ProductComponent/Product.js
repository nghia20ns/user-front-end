import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductItem from "./ProductItem";
import ReactPaginate from "react-paginate";
import "../css/product.css";
import { Context } from "../../../Store/Store";
import Alert from "../../Alert";

const Product = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context);

  const [productSate, setProductState] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  // const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const query = useQuery();
  const page = query.get("page") ? parseInt(query.get("page")) : 1;

  const sortEmail = query.get("sortEmail") ? query.get("sortEmail") : "";
  const sortStatus = query.get("sortStatus") ? query.get("sortStatus") : "";
  const sortProvider = query.get("sortProvider")
    ? query.get("sortProvider")
    : "";

  const getProduct = async (
    page,
    token,
    search,
    sortEmail,
    sortStatus,
    sortProvider
  ) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_PORT}/products/get/${page}/8?search=${search}&sortEmail=${sortEmail}&sortStatus=${sortStatus}&sortProvider=${sortProvider}`,
          {
            headers: {
              Authorization: `Bearer ${token.data.data.access_token}`,
            },
          }
        )
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
    } catch (error) {}
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      const token = JSON.parse(localStorage.getItem("token"));

      getProduct(page, token, search, sortEmail, sortStatus, sortProvider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortEmail, sortStatus, sortProvider]);
  const handlePageClick = (event) => {
    navigate(
      `/products/?page=${
        event.selected + 1
      }&sortEmail=${sortEmail}&sortStatus=${sortStatus}&sortProvider=${sortProvider}`
    );
    getProduct(
      event.selected + 1,
      JSON.parse(localStorage.getItem("token")),
      search,
      sortEmail,
      sortStatus,
      sortProvider
    );
  };
  const btnSortProvider = () => {
    if (sortProvider === "decrease") {
      navigate(
        `/products/?page=${page}&sortEmail=${sortEmail}&sortStatus=${sortStatus}&sortProvider=ascending`
      );
    } else {
      navigate(
        `/products/?page=${page}&sortEmail=${sortEmail}&sortStatus=${sortStatus}&sortProvider=decrease`
      );
    }
  };
  const btnSortStatus = () => {
    if (sortStatus === "decrease") {
      navigate(
        `/products/?page=${page}&sortEmail=${sortEmail}&sortStatus=ascending&sortProvider=${sortProvider}`
      );
    } else {
      navigate(
        `/products/?page=${page}&sortEmail=${sortEmail}&sortStatus=decrease&sortProvider=${sortProvider}`
      );
    }
  };
  const btnSortEmail = () => {
    if (sortEmail === "decrease") {
      navigate(
        `/products/?page=${page}&sortEmail=ascending&sortStatus=${sortStatus}&sortProvider=${sortProvider}`
      );
    } else {
      navigate(
        `/products/?page=${page}&sortEmail=decrease&sortStatus=${sortStatus}&sortProvider=${sortProvider}`
      );
    }
  };

  return (
    <>
      {state.isAlert && <Alert message={state.showMessageAlert} />}

      <div className="row">
        <div className="input-group mb-3">
          <form className="search-form">
            <input
              type="text"
              id="searchInput"
              name="search"
              placeholder="find..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </form>
        </div>
      </div>
      <div className="row">
        <div style={{ height: 500 }}>
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  <div className="row">
                    <div className="col-sm-9">Email</div>
                    <div className="col-sm-3">
                      <img
                        onClick={btnSortEmail}
                        className="img-sort"
                        src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                        alt=""
                        width={15}
                        height={15}
                      ></img>
                    </div>
                  </div>
                </th>
                <th scope="col">Password</th>
                <th scope="col">
                  <div className="row">
                    <div className="col-sm-9">Provider</div>
                    <div className="col-sm-3">
                      <img
                        onClick={btnSortProvider}
                        className="img-sort"
                        src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                        alt=""
                        width={15}
                        height={15}
                      ></img>
                    </div>
                  </div>
                </th>
                <th scope="col">
                  <div className="row">
                    <div className="col-sm-9">Status</div>
                    <div className="col-sm-3">
                      <img
                        onClick={btnSortStatus}
                        className="img-sort"
                        src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                        alt=""
                        width={15}
                        height={15}
                      ></img>
                    </div>
                  </div>
                </th>
                <th scope="col">DATE</th>

                <th scope="col">Action</th>
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
          // eslint-disable-next-line no-const-assign
          initialPage={page - 1}
        />
      </div>
    </>
  );
};

export default Product;
