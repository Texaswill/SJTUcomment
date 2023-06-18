import React from 'react';
import Login from "./view/Login";
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import Root from "./routes/Root";
import Personal from "./view/Personal";
import ErrorPage from "./routes/erropage";
import Recommend from "./view/Recommend";
import NewProduct from "./view/Newproduct";
import Restaurant from "./view/Restaurant";
import Taste from "./view/Taste";
import Community from "./view/Community";
import Details from "./view/Details";
import {CommunityView} from "./view/communityView";
import RestaurantDetails from "./view/resturantDetails";
import SearchDetails from "./view/SearchResults";
import ProfileModifyView from "./view/ProfileModifyView";
import ProfileModifyPage from "./view/ProfileModifyView";
import DishUploadPage from "./view/DishUploadView";

const router = createBrowserRouter([
  {
    path:"/",
    exact: true,
    element:<Login/>,
  },
  {
    path:"/detail/:dishId",
    element:<Details/>,
  },
  {
    path:"/home/Search",
    element:<SearchDetails/>  ,
  },
  {
    path:"/home/ProfilePage",
    element:<Personal/>,
  },
  {
    path:"/home/ProfileModify",
    element:<ProfileModifyPage/>
  } ,
  {
    path:"/home",
    element:<Root/>,
    errorElement:<ErrorPage/>,
    children:[
      {index:true,element:<Recommend/>},
      {
        path:"/home/Recommend",
        element:<Recommend/>  ,
      },
      {
        path:"/home/NewProduct",
        element:<NewProduct/>,
      },

      {
        path:"/home/Restaurant",
        element:<Restaurant/>,
      },
      {
        path:"/home/RestaurantDetails",
        element:<RestaurantDetails/>,
      },
      {
        path:"/home/Taste",
        element:<Taste/>,
      },
      {
        path:"/home/Community",
        element:< CommunityView/>,
      },
      {
        path:"/home/UploadDish",
        element:< DishUploadPage/>,
      },


    ]
  },
])





function App() {

  return (
      <RouterProvider router={router}/>
  );
}



export default App;
