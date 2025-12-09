
import React from 'react';
import HeroSection from '../../components/LandingPage/HeroSection';
import FeaturesSection from '../../components/LandingPage/FeaturesSection';
import AdvantagesSection from '../../components/LandingPage/AdvantagesSection';
import TestimonialsSection from '../../components/LandingPage/TestimonialsSection';
import Footer from '../../components/LandingPage/Footer';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/common/PageMeta';

const LandingPage: React.FC = () => {
    return (
        <>
            <PageMeta
                title="SIKAS"
                description="Sistem Informasi Kasir & Stock"
            />
            <div className="min-h-screen bg-gray-100 font-sans antialiased">
                <header className="flex justify-between items-center p-6 bg-white shadow-md px-40">
                    <div className="flex items-center space-x-2">
                        <img src="/images/logo/logo-sikas.png" alt="SIKAS Logo" className="h-10 w-10" />
                        <span className="text-2xl font-bold text-gray-800">SIKAS</span>
                    </div>
                    <nav>
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
                </header>


                <main>
                    <HeroSection />
                    <FeaturesSection />
                    <AdvantagesSection />
                    <TestimonialsSection />
                </main>

                <Footer />
            </div>
        </>
    );
};

export default LandingPage;