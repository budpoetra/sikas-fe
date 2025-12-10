import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 px-4">
            <div className="container mx-auto px-40 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-6 md:mb-0 flex items-center space-x-2">
                    <img src="/images/logo/logo-sikas.png" alt="SIKAS Logo" className="h-10 w-10" />
                    <span className="text-3xl font-bold">SIKAS</span>
                </div>

                <div className="mb-6 md:mb-0">
                    <h4 className="font-bold text-lg mb-2">Contact Us</h4>
                    <p className="text-gray-400">Email: info@sikas.com</p>
                    <p className="text-gray-400">Phone: +62 812-3456-7890</p>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-2">Follow Us</h4>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-blue-600"
                            >
                                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 5.02 3.66 9.19 8.44 9.93v-7.03H8.08v-2.9h2.36V9.83c0-2.33 1.38-3.62 3.49-3.62.99 0 2.03.18 2.03.18v2.25h-1.14c-1.12 0-1.47.69-1.47 1.4v1.68h2.5l-.4 2.9h-2.1v7.03C18.34 21.26 22 17.09 22 12.07z" />
                            </svg>

                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="#ffffff"
                            >
                                <path d="M18.9 2H21l-6.5 7.4L22 22h-7.6l-4.9-6.4L3.8 22H2l7-7.9L2 2h7.7l4.5 6 4.7-6zM14.6 20h2.1L7.2 4h-2L14.6 20z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-pink-500"
                            >
                                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.51 4.51 0 0 0 12 7.5zm0 7A2.5 2.5 0 1 1 14.5 12 2.5 2.5 0 0 1 12 14.5zM17.5 6A1.5 1.5 0 1 0 19 7.5 1.5 1.5 0 0 0 17.5 6z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
                &copy; {new Date().getFullYear()} SIKAS. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
