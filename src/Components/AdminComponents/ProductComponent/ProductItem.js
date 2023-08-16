/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../../Store/Store";
import { actions } from "../../../Store/Index";
import UpdateModal from "./UpdateModal";
import { getDate } from "date-fns";

const ProductItem = (props) => {
  const [state, dispatch] = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoState, setInfoState] = useState("");

  const product = props.productProps;
  const navigate = useNavigate();
  const handleClick = (index) => {
    navigate(`/products/${index}`);
  };

  //delete
  const deleteProduct = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_PORT}/products/delete/` + id)
      .then((res) => {
        if (res.data.status === "err") {
          navigate("/error");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const btnDelete = (index) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      dispatch(actions.isAlert(true));
      dispatch(actions.showMessageAlert("delete successful"));
      deleteProduct(index);
      window.location.reload(false);
    }
  };
  const getProduct = async (token, id) => {
    await axios
      .get(`${process.env.REACT_APP_PORT}/products/` + id, {
        headers: {
          Authorization: `Bearer ${token.data.data.access_token}`,
        },
      })
      .then((res) => {
        setInfoState(res.data.data);
        if (res.data.status === "error") {
          navigate("/error");
        }
        if (res.data.status === "please login") {
          navigate("/");
        }
      })
      .catch(function (error) {
        navigate("/error");
      });
  };

  // //update
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setInfoState("");
  //   setIsModalOpen(false);
  // };
  const btnUpdate = (index) => {
    navigate(`/products/update/${index}`);
    // if (JSON.parse(localStorage.getItem("token"))) {
    //   const token = JSON.parse(localStorage.getItem("token"));
    //   getProduct(token, index);
    // } else {
    //   navigate("/");
    // }
    // openModal();
  };
  // const date = new Date();
  // let now = date.toISOString();
  const changeIso8601 = (isoDate) => {
    const dateObject = new Date(isoDate);
    const normalDate = dateObject.toLocaleString("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
      formatMatcher: "best fit",
    });

    return normalDate;
  };

  return (
    <>
      <tr key={product._id}>
        <td onClick={() => handleClick(product._id)}>{product.email}</td>
        <td onClick={() => handleClick(product._id)}>{product.password}</td>
        <td onClick={() => handleClick(product._id)}>{product.provider}</td>
        <td onClick={() => handleClick(product._id)}>{product.status}</td>
        <td onClick={() => handleClick(product._id)}>
          {changeIso8601(product.createdAt)}
        </td>

        <td>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => btnUpdate(product._id)}
          >
            update
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => btnDelete(product._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
ProductItem.propTypes = {
  productProps: PropTypes.object.isRequired,
};
