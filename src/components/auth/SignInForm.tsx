import { useState, useEffect } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

interface SignInFormProps {
  onLogin: (credentials: { username: string; password: string }) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onClearError?: () => void;
}

export default function SignInForm({
  onLogin,
  isLoading: externalLoading,
  error,
  onClearError
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Clear error when user starts typing
  useEffect(() => {
    if (onClearError && (username || password)) {
      onClearError();
      setLocalError(null);
    }
  }, [username, password, onClearError]);

  // Sync external error to local state
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setLocalError("Username and password must be filled in");
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);
    try {
      await onLogin({ username, password });
      // Jika berhasil, form akan di-reset oleh redirect
    } catch (error: any) {
      // Fallback error handling jika parent tidak menangani
      if (!error) {
        setLocalError("Login failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = externalLoading || isSubmitting;

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-xs">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign in!
            </p>
          </div>
          {/* Error Message */}
          {
            localError && (
              <div className="p-3 mb-4 rounded-md bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-error-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-error-700 dark:text-error-300">
                      {localError}
                    </p>
                  </div>
                </div>
              </div>
            )
          }
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    error={!!localError}
                  />
                </div >
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      hasError={!!localError}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign in"}
                  </Button>
                </div >
              </div >
            </form >
          </div >
        </div >
      </div >
    </div >
  );
}
