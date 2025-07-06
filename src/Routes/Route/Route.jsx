import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import SignUp from "../../Pages/SignUp/SignUp";
import SignIn from "../../Pages/SignIn/SignIn";
import Blog from "../../Pages/Blog/Blog";
import Mobile from "../../Pages/Mobile/Mobile";
import { productsAndCartLoader } from "../../Loaders/productsAndCartLoader";
import Orders from "../../Pages/Orders/Orders";
import NotFound from "../../Pages/Shared/NotFound/NotFound";
import Laptop from "../../Pages/Home/Laptop/Laptop";
import Tv from "../../Pages/Home/Tv/Tv";
import AllCategories from "../../Pages/Home/Category/AllCategories";
import Contact from "../../Pages/Contact/Contact";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
// import AdminRoute from "../AdminRoute/AdminRoute";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import MyOrder from "../../Pages/Dashboard/MyOrder/MyOrder";
import ManageProduct from "../../Pages/Dashboard/ManageProduct/ManageProduct";
import AdminRoute from "../AdminRoute/AdminRoute";
import Payment from "../../Pages/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/mobile",
        element: <Mobile></Mobile>,
      },

      {
        path: "/laptop",
        element: <Laptop></Laptop>,
      },

      {
        path: "/tv",
        element: <Tv></Tv>,
      },
      {
        path: "/all-categories",
        element: <AllCategories></AllCategories>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/orders",
        loader: productsAndCartLoader,
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <MyOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-order",
        element: (
          <PrivateRoute>
            <MyOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({ params }) =>
          fetch(`https://resell-mobile-shop.vercel.app/bookings/${params.id}`),

        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-product",
        element: (
          <PrivateRoute>
            <ManageProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
