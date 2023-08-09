import About from "../Components/ClientComponents/About";
import Home from "../Components/ClientComponents/Home";
import Information from "../Components/ClientComponents/Information";

export const clientRouter = [
  { path: "/home", component: Home, layoutAdmin: null },
  { path: "/about", component: About, layoutAdmin: null },

  { path: "/information", component: Information, layoutAdmin: null },
];
