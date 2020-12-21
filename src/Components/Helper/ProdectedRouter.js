import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { UserContext } from "../../Hooks/UserContext";

export default function ProdectedRouter(props) {
  const { login } = useContext(UserContext);

  if (login === true) return <Route {...props} />;
  if (login === false) return <Navigate to="/login" />;
  else return null;
}
