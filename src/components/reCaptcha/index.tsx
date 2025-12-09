import { useEffect, useRef } from "react";

interface ReCaptchaProps {
    siteKey: string;
    onVerify: (token: string) => void;
}

export default function ReCaptcha({ siteKey, onVerify }: ReCaptchaProps) {
    const captchaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadScript = () => {
            const existingScript = document.querySelector(
                `script[src="https://www.google.com/recaptcha/api.js"]`
            );

            if (!existingScript) {
                const script = document.createElement("script");
                script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
                script.async = true;
                script.defer = true;
                script.onload = renderCaptcha;
                document.body.appendChild(script);
            } else {
                renderCaptcha();
            }
        };

        const renderCaptcha = () => {
            if (!window.grecaptcha || !captchaRef.current) return;

            window.grecaptcha.render(captchaRef.current, {
                sitekey: siteKey,
                callback: (token: string) => {
                    onVerify(token);
                }
            });
        };

        loadScript();
    }, [siteKey, onVerify]);

    return <div ref={captchaRef}></div>;
}
