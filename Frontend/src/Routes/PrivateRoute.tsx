import { useState } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [userToken] = useState(localStorage.getItem("token"));

  if (!userToken) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default PrivateRoute;
