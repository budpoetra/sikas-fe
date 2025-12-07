import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
        <div className="text-blue-600 mb-4 flex justify-center text-5xl">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const FeaturesSection: React.FC = () => {
    return (
        <section id="features" className="py-20 bg-gray-100 text-center px-40">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
                    Fitur Utama SIKAS
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<svg
                            className="w-16 h-16 mx-auto mb-4"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Logo Kasir Cepat &amp; Mudah"
                        >
                            <circle cx="100" cy="100" r="94" fill="none" stroke="#3B82F6" strokeWidth="6" />
                            <rect x="56" y="48" width="88" height="82" rx="10" fill="#3B82F6" />
                            <rect x="64" y="56" width="72" height="38" rx="6" fill="#ffffff" />
                            <g transform="translate(64,100)" fill="#ffffff">
                                <rect x="0" y="0" width="16" height="14" rx="3" />
                                <rect x="20" y="0" width="16" height="14" rx="3" />
                                <rect x="40" y="0" width="16" height="14" rx="3" />
                                <rect x="0" y="18" width="16" height="14" rx="3" />
                                <rect x="20" y="18" width="36" height="14" rx="3" />
                            </g>
                            <rect x="62" y="134" width="76" height="10" rx="4" fill="#1E40AF" />
                            <polygon points="128,46 114,76 126,76 102,116 118,86 106,86" fill="#FBBF24" transform="translate(4,0) rotate(-12 118 86)" />
                            <g transform="translate(136,132) scale(0.9)">
                                <circle cx="0" cy="0" r="14" fill="#10B981" />
                                <path d="M-6 0.5 L-1.5 4.5 L6  -5" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,3) rotate(20)" />
                            </g>
                            <g fill="#FDE68A">
                                <circle cx="140" cy="52" r="2" />
                                <circle cx="148" cy="64" r="1.5" />
                            </g>
                        </svg>}
                        title="Kasir Cepat & Mudah"
                        description="Proses transaksi penjualan dengan cepat, mendukung berbagai metode pembayaran, dan cetak struk otomatis."
                    />
                    <FeatureCard
                        icon={<svg
                            className="w-16 h-16 mx-auto mb-4"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Logo Manajemen Stok Efisien"
                        >
                            <title>Manajemen Stok Efisien</title>

                            <circle cx="100" cy="100" r="94" fill="none" stroke="#3B82F6" strokeWidth="6" />

                            <g transform="translate(34,56)">
                                <rect x="0" y="56" width="132" height="44" rx="8" fill="#1E40AF" />
                                <rect x="8" y="64" width="116" height="28" rx="6" fill="#3B82F6" />
                                <rect x="10" y="18" width="112" height="44" rx="8" fill="#3B82F6" />
                                <rect x="18" y="26" width="96" height="28" rx="6" fill="#ffffff" />
                                <rect x="34" y="0" width="64" height="28" rx="6" fill="#3B82F6" />
                                <rect x="40" y="6" width="52" height="16" rx="4" fill="#ffffff" />
                            </g>

                            <g transform="translate(124,64)">
                                <rect x="0" y="28" width="10" height="18" rx="2" fill="#FBBF24" />
                                <rect x="16" y="12" width="10" height="34" rx="2" fill="#FBBF24" />
                                <rect x="32" y="6" width="10" height="40" rx="2" fill="#FBBF24" />
                            </g>

                            <g transform="translate(132,128) scale(0.95)">
                                <circle cx="0" cy="0" r="18" fill="#10B981" />
                                <path d="M-8 0.5 L-3 5 L8 -6" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,3) rotate(18)" />
                            </g>

                            <g fill="#FDE68A">
                                <circle cx="142" cy="46" r="2" />
                                <circle cx="150" cy="60" r="1.5" />
                            </g>
                        </svg>
                        }
                        title="Manajemen Stok Efisien"
                        description="Lacak stok secara real-time, dapatkan notifikasi barang menipis, dan kelola inventaris dengan akurat."
                    />
                    <FeatureCard
                        icon={<svg
                            className="w-16 h-16 mx-auto mb-4"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Laporan Penjualan Lengkap"
                        >
                            <title>Laporan Penjualan Lengkap</title>

                            <circle cx="100" cy="100" r="94" fill="none" stroke="#3B82F6" strokeWidth="6" />

                            <g transform="translate(50,40)">
                                <rect x="0" y="0" width="100" height="120" rx="10" fill="#3B82F6" />
                                <rect x="10" y="12" width="80" height="12" rx="4" fill="#ffffff" />
                                <rect x="10" y="32" width="80" height="12" rx="4" fill="#ffffff" />

                                <g transform="translate(10,60)">
                                    <rect x="0" y="24" width="12" height="28" rx="3" fill="#FBBF24" />
                                    <rect x="20" y="14" width="12" height="38" rx="3" fill="#FBBF24" />
                                    <rect x="40" y="4" width="12" height="48" rx="3" fill="#FBBF24" />
                                    <rect x="60" y="18" width="12" height="34" rx="3" fill="#FBBF24" />
                                </g>

                                <path
                                    d="M10 104 L30 92 L50 100 L70 78 L90 86"
                                    stroke="#ffffff"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </g>

                            <g transform="translate(140,135) scale(0.95)">
                                <circle cx="0" cy="0" r="18" fill="#10B981" />
                                <path d="M-8 0.5 L-3 5 L8 -6" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,3) rotate(18)" />
                            </g>

                            <g fill="#FDE68A">
                                <circle cx="145" cy="50" r="2" />
                                <circle cx="153" cy="62" r="1.5" />
                            </g>
                        </svg>
                        }
                        title="Laporan Penjualan Lengkap"
                        description="Akses laporan penjualan harian, mingguan, bulanan untuk analisis kinerja bisnis yang lebih baik."
                    />
                    <FeatureCard
                        icon={<svg
                            className="w-16 h-16 mx-auto mb-4"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Manajemen Produk Komprehensif"
                        >
                            <title>Manajemen Produk Komprehensif</title>

                            <circle cx="100" cy="100" r="94" fill="none" stroke="#3B82F6" strokeWidth="6" />

                            <g transform="translate(42,40)">
                                <rect x="0" y="0" width="116" height="120" rx="12" fill="#3B82F6" />

                                <rect x="12" y="12" width="40" height="40" rx="8" fill="#ffffff" />
                                <rect x="60" y="12" width="44" height="14" rx="5" fill="#ffffff" />
                                <rect x="60" y="32" width="44" height="14" rx="5" fill="#ffffff" />

                                <rect x="12" y="60" width="28" height="40" rx="6" fill="#FBBF24" />
                                <rect x="46" y="60" width="28" height="40" rx="6" fill="#FBBF24" />
                                <rect x="80" y="60" width="28" height="40" rx="6" fill="#FBBF24" />

                                <g transform="translate(12,105)">
                                    <rect x="0" y="0" width="6" height="10" fill="#ffffff" />
                                    <rect x="10" y="0" width="6" height="10" fill="#ffffff" />
                                    <rect x="20" y="0" width="6" height="10" fill="#ffffff" />
                                    <rect x="30" y="0" width="6" height="10" fill="#ffffff" />
                                </g>
                            </g>

                            <g transform="translate(138,134) scale(0.95)">
                                <circle cx="0" cy="0" r="18" fill="#10B981" />
                                <path d="M-8 0.5 L-3 5 L8 -6" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,3) rotate(18)" />
                            </g>

                            <g fill="#FDE68A">
                                <circle cx="148" cy="52" r="2" />
                                <circle cx="156" cy="64" r="1.5" />
                            </g>
                        </svg>
                        }
                        title="Manajemen Produk Komprehensif"
                        description="Tambahkan, edit, dan atur produk Anda dengan mudah, termasuk harga, kategori, dan varian."
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
