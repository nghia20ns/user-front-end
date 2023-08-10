import About from "../Components/ClientComponents/About";
import Cart from "../Components/ClientComponents/Cart";
import Home from "../Components/ClientComponents/Home";
import Information from "../Components/ClientComponents/Information";

export const clientRouter = [
  { path: "/home", component: Home, layoutAdmin: null },
  { path: "/about", component: About, layoutAdmin: null },
  { path: "/cart/:id", component: Cart, layoutAdmin: null },

  { path: "/information", component: Information, layoutAdmin: null },
];
