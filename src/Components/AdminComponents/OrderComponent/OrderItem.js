import React from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

const OrderItem = (props) => {
  const trans = props.transProps;
  const navigate = useNavigate();
  const handleClick = (index) => {
    navigate(`/orders/${index}`);
  };

  return (
    <>
      <tr onClick={() => handleClick(trans._id)} key={trans._id}>
        <td>{trans.userId}</td>
        <td>{trans.provider}</td>
        <td>{trans.quantity}</td>
      </tr>
    </>
  );
};

export default OrderItem;
OrderItem.propTypes = {
  transProps: PropTypes.object.isRequired,
};
