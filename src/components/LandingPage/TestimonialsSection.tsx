import React from 'react';

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
    avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, avatar }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
        <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <p className="text-gray-700 italic mb-4">"{quote}"</p>
        <h4 className="font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{title}</p>
    </div>
);

const TestimonialsSection: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 px-6 md:px-20 bg-gray-100 text-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
                    What They Say About SIKAS?
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="SIKAS has greatly helped the operations of my store. Stock recording is more accurate and transactions are faster!"
                        name="Budi Santoso"
                        title="Owner of Jaya Grocery Store"
                        avatar="/images/user/user-20.jpg"
                    />

                    <TestimonialCard
                        quote="SIKAS's UI is modern and easy to understand, my employees adapted quickly. The sales reports are also very detailed."
                        name="Siti Aminah"
                        title="Manager of Rasa Restaurant"
                        avatar="/images/user/user-21.jpg"
                    />

                    <TestimonialCard
                        quote="As an MSME, SIKAS is an affordable and powerful POS solution. Its product management features are top-notch!"
                        name="Dewi Lestari"
                        title="Owner of Mode Boutique"
                        avatar="/images/user/user-26.jpg"
                    />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
