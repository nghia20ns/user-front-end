import React, { useState } from 'react';
import axios from 'axios';
import '../css/product.css'; // Import CSS file
import Alert from '../Alert';

const AddProduct = () => {
  const [apiInput, setApiInput] = useState('');
  const [messageError, setMessageError] = useState("");
  const [isShowAlert, setIsShowAlert] = useState(false);

  const createProduct = async () => {
    try {
      const dataObject = JSON.parse(apiInput);
      if (Array.isArray(dataObject)) {
        await axios.post('http://45.77.215.103/api/product/create', {
          apiInput: dataObject,
        })
        .then((res) => {
          if (res.data.status === "success") {
            setIsShowAlert(true);
            setMessageError(res.data.message);
            setApiInput('')
          } else if (res.data.status === "error") {
            setIsShowAlert(true);
            setMessageError(res.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        console.log('Dữ liệu không hợp lệ! Chuỗi JSON phải là một mảng đối tượng.');
      }
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createProduct();
  };

  return (
<>   
{isShowAlert && <Alert message={messageError} />}
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
