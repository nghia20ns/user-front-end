import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductItem from "./ProductItem";
import ReactPaginate from "react-paginate";
import "../css/product.css";
import { Context } from "../../../Store/Store";
import Alert from "../../Alert";
import { actions } from "../../../Store/Index";

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
  const sortCreatedAt = query.get("sortCreatedAt")
    ? query.get("sortCreatedAt")
    : "";

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
          `${process.env.REACT_APP_PORT}/products/get/${page}/20?search=${search}&sortEmail=${sortEmail}&sortStatus=${sortStatus}&sortProvider=${sortProvider}&sortCreatedAt=${sortCreatedAt}`,
          {
            headers: {
              Authorization: `Bearer ${token.data.data.access_token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.status === "please login") {
            localStorage.removeItem("token");
            dispatch(actions.isLogin(true));
            navigate("/");
          }
          if (res.data.status === "token expired") {
            localStorage.removeItem("token");
            dispatch(actions.isLogin(true));
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

      getProduct(
        page,
        token,
        search,
        sortEmail,
        sortStatus,
        sortProvider,
        sortCreatedAt
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortEmail, sortStatus, sortProvider, sortCreatedAt]);
  const handlePageClick = (event) => {
    if (sortEmail) {
      navigate(`/products/?page=${event.selected + 1}&sortEmail=${sortEmail}`);
    } else if (sortStatus) {
      navigate(
        `/products/?page=${event.selected + 1}&sortStatus=${sortStatus}`
      );
    } else if (sortProvider) {
      navigate(
        `/products/?page=${event.selected + 1}&sortProvider=${sortProvider}`
      );
    } else if (sortCreatedAt) {
      navigate(
        `/products/?page=${event.selected + 1}&sortCreatedAt=${sortCreatedAt}`
      );
    }

    getProduct(
      event.selected + 1,
      JSON.parse(localStorage.getItem("token")),
      search,
      sortEmail,
      sortStatus,
      sortProvider,
      sortCreatedAt
    );
  };
  const btnSortProvider = () => {
    if (sortProvider === "decrease") {
      navigate(`/products/?page=${page}&sortProvider=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortProvider=decrease`);
    }
  };
  const btnSortStatus = () => {
    if (sortStatus === "decrease") {
      navigate(`/products/?page=${page}&sortStatus=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortStatus=decrease`);
    }
  };
  const btnSortEmail = () => {
    if (sortEmail === "decrease") {
      navigate(`/products/?page=${page}&sortEmail=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortEmail=decrease`);
    }
  };
  const btnSortCreatedAt = () => {
    if (sortCreatedAt === "decrease") {
      navigate(`/products/?page=${page}&sortCreatedAt=ascending`);
    } else {
      navigate(`/products/?page=${page}&sortCreatedAt=decrease`);
    }
  };

  return (
    <>
      {state.isAlert && <Alert message={state.showMessageAlert} />}
      <div className="row">
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
          <div style={{ height: 600 }} className="table-container">
            <table className="table table-hover">
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
                  <th scope="col">EMAIL RECOVER</th>
                  <th scope="col">INFORMATION</th>
                  <th scope="col">
                    <div className="row">
                      <div className="col-sm-9">CREATED AT</div>
                      <div className="col-sm-3">
                        <img
                          onClick={btnSortCreatedAt}
                          className="img-sort"
                          src="https://cdn-icons-png.flaticon.com/512/164/164018.png"
                          alt=""
                          width={15}
                          height={15}
                        ></img>
                      </div>
                    </div>
                  </th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {productSate.map((product) => {
                  return (
                    <ProductItem key={product._id} productProps={product} />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination-wrapper">
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
      </div>
    </>
  );
};

export default Product;
