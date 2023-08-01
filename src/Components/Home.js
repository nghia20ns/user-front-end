/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { actions } from "../Store/Index";
import { Context } from "../Store/Store";

const Home = () => {
  console.log(process.env.REACT_APP_PORT);

  // console.log(state.todoInput);
  return <div>Home</div>;
};

export default Home;
