import AddUser from "../Components/UserComponent/AddUser";
import Dashboard from "../Components/Dashboard";
import InfoUser from "../Components/UserComponent/InfoUser";
import Login from "../Components/Login";
import UpdateUser from "../Components/UserComponent/Update";
import User from "../Components/UserComponent/User";
import Home from "../Components/Home";
import Product from "../Components/ProductComponent/Product";
import InfoProduct from "../Components/ProductComponent/InfoProduct";
import UpdateProduct from "../Components/ProductComponent/UpdateProduct";

import Signup from "../Components/Signup";
import Order from "../Components/OrderComponent/Order";
import OrderInfo from "../Components/OrderComponent/OrderInfo";

const publicRoutes = [
  { path: "/", component: Login, layout: null },
  { path: "/signup", component: Signup, layout: null },

  { path: "/home", component: Home, layout: null },
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: User },
  { path: "/users/:id", component: InfoUser },
  { path: "/users/update/:id", component: UpdateUser },
  { path: "/users/add", component: AddUser },
  { path: "/products", component: Product },
  { path: "/products/:id", component: InfoProduct },
  { path: "/products/update/:id", component: UpdateProduct },

  { path: "/orders", component: Order },
  { path: "/orders/:id", component: OrderInfo },
];
const privateRoutes = {};
export { publicRoutes, privateRoutes };
