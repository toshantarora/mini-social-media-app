import React from "react";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import FeedsPage from "./pages/FeedsPage";
import { useAppContext } from "./context/AppContext";
import Loader from "./components/Loader/Loader";
import MyPostsPage from "./pages/MyPostsPage/MyPostsPage";
import SavedPostsPage from "./pages/SavedPostsPage/SavedPostsPage";

function App() {
  const { isUserDataloading, user, userData, isAuthenticated } =
    useAppContext();

  if (isUserDataloading) {
    return <Loader loading={isUserDataloading} color="#4F46E5" />;
  }
  console.log("isAuthenticated", isAuthenticated);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<FeedsPage />} />

          <Route path="my-posts" element={isAuthenticated && <MyPostsPage />} />

          <Route
            path="saved-posts"
            element={isAuthenticated && <SavedPostsPage />}
          />
        </Route>
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />
          }
        />

        {/* Redirect any unmatched routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
