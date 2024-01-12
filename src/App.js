import logo from './logo.svg';
import './App.css';
import {RouterProvider, createHashRouter} from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Categories from "./Pages/Categories/Categories";
import Notfound from "./Pages/Notfound/Notfound";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import {Toaster} from "react-hot-toast";
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/CartContext';
import Address from './Pages/Address/Address';
import Orders from './Pages/Orders/Orders';
import OrdersContextProvider from './Context/OrdersContext';

const routers= createHashRouter([
  {path: "/" , element:<Layout/> , children: [
    {index:true, element:<Home/>},
    {path:"/Login" , element:<Login/>},
    {path:"/Register" , element:<Register/>},
    {path:"/Products" , element:<Products/>},
    {path:"/Categories" , element:<Categories/>},
    // {path:"Brands" , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"/Cart" , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"/ProductDetails/:id" , element:<ProductDetails/>},
    {path:"/Address/:id" , element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:"/Allorders" , element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:"*" , element:<Notfound/>},

  ]}
])

function App() {

  return<CartContextProvider>
    
  <UserContextProvider>
  
  <RouterProvider router={routers}></RouterProvider>
  
  </UserContextProvider>
  <Toaster/>
  
</CartContextProvider>
}

export default App;
