import { useState, useEffect } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import ReCaptcha from "../reCaptcha";

interface SignInFormProps {
  onLogin: (credentials: { username: string; password: string; captchaToken: string }) => Promise<void>; // ⬅️ tambah captchaToken
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
  const [captchaToken, setCaptchaToken] = useState("");

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

    if (!captchaToken) {                       // ⬅️ validasi reCAPTCHA
      setLocalError("Please verify the captcha");
      return;
    }

    setIsSubmitting(true);
    setLocalError(null);
    try {
      await onLogin({ username, password, captchaToken }); // ⬅️ kirim token ke backend
    } catch {
      setLocalError("Login failed. Please try again.");
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
          {localError && (
            <div className="p-3 mb-4 rounded-md bg-error-50 dark:bg-error-900/30 border border-error-200 dark:border-error-800">
              <p className="text-sm text-error-700 dark:text-error-300">{localError}</p>
            </div>
          )}

          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">

                {/* Username */}
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    error={!!localError}
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
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

                {/* reCAPTCHA */}
                <div className="flex justify-center">  {/* ⬅️ styling bebas disesuaikan */}
                  <ReCaptcha
                    siteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onVerify={(token) => setCaptchaToken(token)}
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <Button
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign in"}
                  </Button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
