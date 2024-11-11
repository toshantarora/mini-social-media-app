import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyPostsPage = () => {
  const { user, userData, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return <div>MyPostsPage</div>;
};

export default MyPostsPage;
