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
                    Apa Kata Mereka Tentang SIKAS?
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="SIKAS sangat membantu operasional toko saya. Pencatatan stok jadi lebih akurat dan transaksi lebih cepat!"
                        name="Budi Santoso"
                        title="Pemilik Toko Kelontong Jaya"
                        avatar="/images/user/user-20.jpg"
                    />

                    <TestimonialCard
                        quote="UI SIKAS modern dan mudah dipahami, karyawan saya cepat beradaptasi. Laporan penjualan juga sangat detail."
                        name="Siti Aminah"
                        title="Manajer Restoran Rasa"
                        avatar="/images/user/user-21.jpg"
                    />

                    <TestimonialCard
                        quote="Sebagai UMKM, SIKAS adalah solusi POS yang terjangkau dan powerful. Fitur manajemen produknya top!"
                        name="Dewi Lestari"
                        title="Pengusaha Boutique Mode"
                        avatar="/images/user/user-26.jpg"
                    />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
