import React from 'react';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
    const product = props.productProps;
    const navigate = useNavigate();
    const handleClick = (index) => {
        navigate(`/products/${index}`);
    };
    return (
        <>
            <tr onClick={() => handleClick(product._id)} key={product._id}>
                <td>{product.email}</td>
                <td>{product.password}</td>
                <td>{product.provider}</td>

                <td>{product.status}</td>
            </tr>

        </>
    );
};

export default ProductItem;
ProductItem.propTypes = {
    productProps: PropTypes.object.isRequired,
  };