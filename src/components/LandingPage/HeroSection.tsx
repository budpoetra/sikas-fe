import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-20 px-4 text-center">
            <div className="container mx-auto">
                <h1 className="text-5xl font-extrabold mb-4">
                    Cashier and Stock Information System <br /> for Your Business
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Manage sales, inventory, and reports easily and efficiently using SIKAS.
                </p>
                <div className="space-x-4">
                    <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                        Try Now
                    </button>
                    <button className="border border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300">
                        Register for Free
                    </button>
                </div>
                <div className="mt-5">
                    <div className="flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 420 260"
                            width="550"
                            height="300"
                        >
                            <circle
                                cx="210"
                                cy="135"
                                r="110"
                                fill="#E8F0FF"
                                className="animate-pulse-svg"
                            />

                            <g transform="translate(90,45)" className="animate-float-svg">
                                <rect x="0" y="18" width="160" height="160" rx="18" fill="#2563EB" />
                                <rect x="16" y="32" width="128" height="64" rx="10" fill="#ffffff" />

                                <g transform="translate(26,110)" fill="#93C5FD">
                                    <rect x="0" y="0" width="32" height="20" rx="4" />
                                    <rect x="40" y="0" width="32" height="20" rx="4" />
                                    <rect x="80" y="0" width="32" height="20" rx="4" />
                                    <rect x="120" y="0" width="32" height="20" rx="4" />
                                    <rect x="0" y="26" width="48" height="20" rx="4" />
                                    <rect x="56" y="26" width="104" height="20" rx="4" />
                                </g>
                            </g>

                            <g transform="translate(75,190)">
                                <rect x="0" y="0" width="70" height="40" rx="6" fill="#BFDBFE" />
                                <rect x="22" y="-16" width="26" height="14" rx="3" fill="#93C5FD" />
                            </g>

                            <g transform="translate(280,75)">
                                <circle cx="36" cy="36" r="36" fill="#10B981" />
                                <path
                                    d="M22 36 L34 48 L54 22"
                                    stroke="#fff"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="animate-check-svg"
                                />
                            </g>

                            <g transform="translate(250,170)">
                                <circle cx="30" cy="-10" r="20" fill="#475569" />
                                <path d="M0 52 C14 18 54 18 70 52 Z" fill="#1E293B" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-pulse-svg {
                    animation: pulse 2s infinite alternate;
                    transform-origin: center;
                }

                @keyframes pulse {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }

                .animate-float-svg {
                    animation: float 3s ease-in-out infinite alternate;
                }
                    
                @keyframes float {
                    from { transform: translate(90px, 45px); }
                    to { transform: translate(90px, 40px); }
                }

                .animate-check-svg {
                    stroke-dasharray: 50;
                    stroke-dashoffset: 50;
                    animation: draw 1s ease-out forwards 0.5s;
                }
                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;
