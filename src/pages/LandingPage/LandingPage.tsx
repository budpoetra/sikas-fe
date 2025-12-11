
import React from 'react';
import HeroSection from '../../components/LandingPage/HeroSection';
import FeaturesSection from '../../components/LandingPage/FeaturesSection';
import AdvantagesSection from '../../components/LandingPage/AdvantagesSection';
import TestimonialsSection from '../../components/LandingPage/TestimonialsSection';
import Footer from '../../components/LandingPage/Footer';
import PageMeta from '../../components/common/PageMeta';
import Navbar from '@/components/LandingPage/NavBar';

const LandingPage: React.FC = () => {
    return (
        <>
            <PageMeta
                title="SIKAS"
                description="Sistem Informasi Kasir & Stock"
            />
            <div className="min-h-screen bg-gray-100 font-sans antialiased">
                <Navbar />

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