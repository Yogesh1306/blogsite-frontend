import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const GuestRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Navigate to="/" replace /> : <Outlet />;
};
