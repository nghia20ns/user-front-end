import React from 'react';
import PropTypes from "prop-types";

import { useNavigate } from 'react-router-dom';

const TranstractionItem = (props) => {
    const trans = props.transProps;
    const navigate = useNavigate();
    const handleClick = (index) => {
        navigate(`/transtractions/${index}`);
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

export default TranstractionItem;
TranstractionItem.propTypes = {
    transProps: PropTypes.object.isRequired,
  };