import { useState, useCallback, useMemo } from "react";
import axios, { AxiosError } from "axios";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Define types for API response
interface LoginResponse {
  success?: boolean;
  message?: string;
  status?: number;
  timestamp?: string;
  data?: {
    token: string;
    tokenType: string;
    expireAt: string;
    username: string;
    userTypes: string[];
  };
}

// Error response interface
interface ErrorResponse {
  success?: boolean;
  message?: string;
  status?: number;
  timestamp?: string;
  error?: string;
}

// Custom hook for API calls
const useApi = () => {
  return useMemo(() => {
    const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000, // 10 seconds timeout
    });

    // Response interceptor for handling common errors
    api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.code === "ECONNABORTED") {
          console.error("Request timeout");
        }
        return Promise.reject(error);
      }
    );

    return api;
  }, []);
};

// Custom hook for login logic
const useLogin = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);


  const handleLogin = useCallback(
    async (credentials: { username: string; password: string, captchaToken: string }) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post<LoginResponse>("/auth/login", credentials);
        const data = response.data;

        // Check if login was successful based on your API response
        if (!data.success || !data.data?.token) {
          throw new Error(data.message || "Login failed");
        }

        // Extract token
        const token = data.data.token;

        // Validate token format
        if (typeof token !== "string" || token.split(".").length !== 3) {
          throw new Error("Invalid token format received");
        }

        // Use AuthContext to handle authentication
        authLogin(token, {
          user: {
            username: data.data.username,
            userTypes: data.data.userTypes,
            expireAt: data.data.expireAt,
          },
        });

        // Redirect based on user role
        const userRole = data.data.userTypes?.[0];
        const redirectPath = getRedirectPath(userRole);
        navigate(redirectPath, { replace: true });

      } catch (err: any) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        throw err; // Re-throw untuk ditangkap di form
      } finally {
        setIsLoading(false);
      }
    },
    [api, authLogin, navigate]
  );

  // return { handleLogin, isLoading, error };
  return { handleLogin, isLoading, error, clearError };
};

// Helper function to determine redirect path based on user role
const getRedirectPath = (role?: string): string => {
  const rolePaths: Record<string, string> = {
    admin: "/dashboard",
  };

  return rolePaths[role || ""] || "/dashboard";
};

const getErrorMessage = (error: any): string => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      const { status, data } = axiosError.response;

      // Handle based on your API error response structure
      if (data?.message) {
        return data.message;
      }

      if (data?.error) {
        return data.error;
      }

      switch (status) {
        case 400:
          return "Invalid request. Please check your input";
        case 401:
          return "Invalid username or password";
        case 403:
          return "Your account does not have access";
        case 404:
          return "Authentication service not found";
        case 422:
          return "Validation error. Please check your input";
        case 429:
          return "Too many login attempts. Please try again later";
        case 500:
        case 502:
        case 503:
          return "Server is temporarily unavailable. Please try again later";
        default:
          return `Authentication failed (Error ${status})`;
      }
    }

    if (axiosError.code === "ECONNABORTED") {
      return "Request timeout. Please check your connection";
    }

    if (axiosError.code === "NETWORK_ERROR" || !axiosError.response) {
      return "Cannot connect to server. Please check your network connection";
    }
  }

  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred during login";
};

export default function SignIn() {
  const { handleLogin, isLoading, error, clearError } = useLogin();

  return (
    <>
      <PageMeta
        title="Sign In | SIKAS"
        description="Sign in to Sistem Informasi Kasir & Stock"
      />
      <AuthLayout>
        <SignInForm
          onLogin={handleLogin}
          isLoading={isLoading}
          error={error}
          onClearError={clearError}
        />
      </AuthLayout>
    </>
  );
}