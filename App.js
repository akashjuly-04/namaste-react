import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom/client";
import Body from "./src/components/Body";
import Header from "./src/components/Header";
import {createBrowserRouter,createBrowserRouter,RouterProvider,Outlet} from "react-router-dom"
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./src/cart";

const jsxHeading=<h1 className="heading">Namaste React from JSX</h1>


//console.log(resObj)

const App=()=>{

  const [userName,setUserName]=useState();

  useEffect(()=>{
    const data={
      name:"Akash kumar"
    }
    setUserName(data.name)
  },[])


  return(
    <div>
      <Provider store={appStore}>
      <UserContext.Provider value={{loggedInUser:userName}}>
      <Header/>
      <Outlet/>
      </UserContext.Provider>
      </Provider>
    </div>
  )
}
const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
    {
      path:"/",
      element:<Body/>,
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/contact",
      element:<Contact/>
    },
    {
      path:"/restaurants/:resId",
      element:<RestaurantMenu/>
    },
    {
      path:"/cart",
      element:<Cart/>

    }
  ],
    errorElement:<Error/>
  },
  

])

  const root=ReactDOM.createRoot(document.getElementById("root"))
  root.render(<RouterProvider router={appRouter}/>)