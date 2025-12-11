import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex justify-between items-center p-6 bg-white shadow-md px-6 md:px-40">
            <div className="flex items-center space-x-2">
                <img src="/images/logo/logo-sikas.png" alt="SIKAS Logo" className="h-10 w-10" />
                <span className="text-2xl font-bold text-gray-800">SIKAS</span>
            </div>

            {/* Mobile Toggle */}
            <button
                className="md:hidden block text-gray-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:block">
                <ul className="flex space-x-8 items-center">
                    <li><a href="#features" className="text-gray-600 hover:text-blue-600">Feature</a></li>
                    <li><a href="#advantages" className="text-gray-600 hover:text-blue-600">Advantages</a></li>
                    <li><a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimony</a></li>
                    <li>
                        <Link
                            to="/signin"
                            className="bg-black text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-800 transition"
                        >
                            Sign In
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="absolute top-20 right-0 w-full bg-white shadow-md md:hidden animate-fadeIn">
                    <ul className="flex flex-col space-y-4 p-6 text-center">
                        <li><a href="#features" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-blue-600">Feature</a></li>
                        <li><a href="#advantages" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-blue-600">Advantages</a></li>
                        <li><a href="#testimonials" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-blue-600">Testimony</a></li>
                        <li>
                            <Link
                                to="/signin"
                                onClick={() => setIsOpen(false)}
                                className="bg-black text-white font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-800 transition"
                            >
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
