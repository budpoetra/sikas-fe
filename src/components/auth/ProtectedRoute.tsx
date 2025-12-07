import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Cek apakah user sudah login
  // Anda bisa mengganti ini dengan logika autentikasi sesungguhnya
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    // Redirect ke halaman login jika belum autentikasi
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}