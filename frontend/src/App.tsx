import {createBrowserRouter,RouterProvider} from "react-router-dom";
import MainLayout from './Layouts/MainLayout'
import HomePage from "./Pages/HomePage"
import MoviesPage from "./Pages/MoviesPage"

const router = createBrowserRouter([
  {
    element:<MainLayout />,
    children:[
      {path:"/",element:<HomePage />},
      {path:"/movies",element:<MoviesPage />}
    ]
  }
])

function App(){
    return(
      <RouterProvider router={router} />
    )
}

export default App
