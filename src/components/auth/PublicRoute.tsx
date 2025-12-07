import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  // Cek apakah user sudah login
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    // Redirect ke dashboard jika sudah login
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}