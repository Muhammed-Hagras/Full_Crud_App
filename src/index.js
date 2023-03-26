import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./pages/RootLayout";
// import Details from "./pages/Details";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
// import EditPost from "./pages/EditPost";
// import AddPost from "./pages/AddPost";

const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Details = React.lazy(() => import("./pages/Details"));


const postParamHandler =({params}) => {
  if(isNaN(params.id)){
    throw new Response("Bad Request", {
      statusText: "Please Make sure to insert correct number id",
      status: 400,
    })
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element:<Index/>},
      {path: "post", element: <Index/>},
      {path: "post/add", element: (
        <Suspense fallback= "loading plaase wait............">
           <AddPost/>
        </Suspense>
      )
    },
      
      {path: "post/:id", element: <Details/>,
      loader: postParamHandler
    },
      {path: "post/:id/edit", element: (
        <Suspense fallback= "loading plaase wait............">
          <EditPost/>
        </Suspense>
      )} 
    ]
  }
])



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
