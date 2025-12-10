interface AppEnv {
    VITE_API_URL: string | undefined;
    VITE_APP_NAME: string | undefined;
    VITE_ENV: string | undefined;
    VITE_VERSION: string | undefined;
    VITE_RECAPTCHA_SITE_KEY: string | undefined;
}

export const env: AppEnv = {
    VITE_API_URL:
        (window as any)._env_?.VITE_API_URL ?? import.meta.env.VITE_API_URL,
    VITE_APP_NAME:
        (window as any)._env_?.VITE_APP_NAME ?? import.meta.env.VITE_APP_NAME,
    VITE_ENV:
        (window as any)._env_?.VITE_ENV ?? import.meta.env.VITE_ENV,
    VITE_VERSION:
        (window as any)._env_?.VITE_VERSION ?? import.meta.env.VITE_VERSION,
    VITE_RECAPTCHA_SITE_KEY:
        (window as any)._env_?.VITE_RECAPTCHA_SITE_KEY ?? import.meta.env.VITE_RECAPTCHA_SITE_KEY,
};
