/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { actions } from "../Store/Index";
import { Context } from "../Store/Store";

const Home = () => {
  const [state, dispatch] = useContext(Context);

  dispatch(actions.setTodoInput(""));
  // console.log(state.todoInput);
  return <div>Home</div>;
};

export default Home;
