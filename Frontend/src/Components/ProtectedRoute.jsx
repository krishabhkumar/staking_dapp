import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ walletConnected, children }) => {
  if (!walletConnected) {
    return <Navigate to="/" replace/>;
  }
  return children;
};

export default ProtectedRoute;
