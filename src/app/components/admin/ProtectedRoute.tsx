import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("kaiina_admin_auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
