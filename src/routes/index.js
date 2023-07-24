import AddUser from "../Components/UserComponent/AddUser";
import Dashboard from "../Components/Dashboard";
import InfoUser from "../Components/UserComponent/InfoUser";
import Login from "../Components/Login";
import UpdateUser from "../Components/UserComponent/Update";
import User from "../Components/UserComponent/User";
import Home from "../Components/Home";
import Product from "../Components/ProductComponent/Product";
import InfoProduct from "../Components/ProductComponent/InfoProduct";
import AddProduct from "../Components/ProductComponent/AddProduct";
import Transtraction from "../Components/TranstractionComponent/Transtraction";
import TranstractionInfo from "../Components/TranstractionComponent/TranstractionInfo";
import Signup from "../Components/Signup";

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
  { path: "/products/add", component: AddProduct },
  { path: "/transtractions", component: Transtraction },
  { path: "/transtractions/:id", component: TranstractionInfo },


];
const privateRoutes = {};
export { publicRoutes, privateRoutes };
