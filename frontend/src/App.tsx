import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import MoviesPage from "./Pages/MoviesPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/Registerpage";
import { AuthContextProvider } from "./Context/AuthContext";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/movies", element: <MoviesPage /> },
            // routed from home
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
        ],
    },
]);

function App() {
    return (
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    );
}

export default App;
