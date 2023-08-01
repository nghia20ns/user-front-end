import React, { useContext, useState } from "react";
import axios from "axios";
import "../css/product.css"; // Import CSS file
import Alert from "../Alert";
import { Context } from "../../Store/Store";
import { actions } from "../../Store/Index";

const AddProduct = () => {
  const [apiInput, setApiInput] = useState("");
  const [state, dispatch] = useContext(Context);

  const createProduct = async () => {
    try {
      const dataObject = JSON.parse(apiInput);
      if (Array.isArray(dataObject)) {
        await axios
          .post(`${process.env.REACT_APP_PORT}/product/create`, {
            apiInput: dataObject,
          })
          .then((res) => {
            if (res.data.status === "success") {
              dispatch(actions.isAlert(true));
              dispatch(actions.showMessageAlert(res.data.message));
              setApiInput("");
            } else if (res.data.status === "error") {
              dispatch(actions.isAlert(true));
              dispatch(actions.showMessageAlert(res.data.message));
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log(
          "Dữ liệu không hợp lệ! Chuỗi JSON phải là một mảng đối tượng."
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(actions.isAlert(true));
      dispatch(actions.showMessageAlert("error"));
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    createProduct();
  };

  return (
    <>
      <div className="row" style={{ height: 50 }}>
        {state.isAlert && <Alert message={state.showMessageAlert} />}
      </div>{" "}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-wrapper">
          <h2 className="form-title">ADD</h2>
          <textarea
            rows={15}
            type="text"
            value={apiInput}
            onChange={(e) => setApiInput(e.target.value)}
            className="form-input"
            placeholder="Nhập chuỗi API..."
          />
          <button type="submit" className="form-button">
            Thêm dữ liệu
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
