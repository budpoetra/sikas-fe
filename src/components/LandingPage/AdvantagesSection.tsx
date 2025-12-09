import React from 'react';

interface AdvantageCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ title, description, icon }) => (
    <div className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md">
        <div className="text-blue-600 text-3xl flex-shrink-0">{icon}</div>
        <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const AdvantagesSection: React.FC = () => {
    return (
        <section id="advantages" className="py-20 px-40 bg-white">
            <div className="container mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
                    Why Choose SIKAS?
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                    <AdvantageCard
                        icon={
                            <svg
                                className="w-20 h-20"
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Dukungan Penuh untuk UMKM"
                            >
                                <circle cx="100" cy="100" r="94" fill="none" stroke="#3B82F6" strokeWidth="6" />

                                <g transform="translate(55,65)">
                                    <rect x="0" y="20" width="90" height="45" rx="6" fill="#3B82F6" />
                                    <rect x="8" y="28" width="74" height="18" rx="4" fill="#ffffff" />
                                    <rect x="28" y="48" width="34" height="12" rx="3" fill="#1E3A8A" />
                                    <rect x="20" y="0" width="50" height="22" rx="4" fill="#60A5FA" />
                                </g>

                                <g transform="translate(120,115)">
                                    <path
                                        d="M-40 10 C-20 30 10 30 25 10 C30 5 25 -5 18 -4 C10 -3 5 5 0 7 C-5 9 -12 0 -20 -2 C-30 -4 -45 3 -40 10 Z"
                                        fill="#10B981"
                                    />
                                </g>
                            </svg>

                        }
                        title="Full Support for MSMEs"
                        description="SIKAS is specifically designed to meet the needs of MSMEs with relevant features and affordable prices."
                    />
                    <AdvantageCard
                        icon={<svg
                            className="w-20 h-20"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Tampilan UI Modern dan Intuitif"
                        >
                            <circle cx="100" cy="100" r="94" fill="none" stroke="#6366F1" strokeWidth="6" />

                            <rect x="48" y="50" width="104" height="80" rx="10" fill="#6366F1" />
                            <rect x="58" y="60" width="84" height="22" rx="6" fill="#ffffff" />
                            <rect x="58" y="90" width="38" height="30" rx="6" fill="#818CF8" />
                            <rect x="104" y="90" width="38" height="30" rx="6" fill="#A5B4FC" />

                            <g transform="translate(122,70)">
                                <polygon
                                    points="0,0 14,10 6,12 10,22 2,14 0,22"
                                    fill="#FCD34D"
                                    transform="scale(0.9)"
                                />
                            </g>

                            <circle cx="140" cy="66" r="6" fill="#F87171" />
                        </svg>
                        }
                        title="Modern and Intuitive UI Display"
                        description="A clean, modern, and user-friendly interface that accelerates new user adoption."
                    />
                    <AdvantageCard
                        icon={
                            <svg
                                className="w-20 h-20"
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Hemat Waktu & Biaya Operasional"
                            >
                                <circle cx="100" cy="100" r="94" fill="none" stroke="#0EA5E9" strokeWidth="6" />

                                <g transform="translate(30,28) scale(1)">
                                    <rect x="0" y="34" width="84" height="62" rx="8" fill="#0EA5E9" />
                                    <rect x="8" y="42" width="68" height="34" rx="5" fill="#ffffff" />
                                    <g transform="translate(12,84)" fill="#ffffff">
                                        <rect x="0" y="0" width="12" height="10" rx="2" />
                                        <rect x="16" y="0" width="12" height="10" rx="2" />
                                        <rect x="32" y="0" width="12" height="10" rx="2" />
                                    </g>
                                    <rect x="6" y="102" width="72" height="8" rx="4" fill="#075985" />
                                </g>

                                <g transform="translate(106,36) scale(1)">
                                    <g transform="translate(6,6)">
                                        <circle cx="28" cy="28" r="22" fill="#10B981" />
                                        <path d="M24 22 L30 28 L20 30 L28 36" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <g transform="translate(12,64)">
                                        <rect x="0" y="0" width="36" height="22" rx="4" fill="#F59E0B" />
                                        <circle cx="26" cy="11" r="5" fill="#ffffff" />
                                        <path d="M6 6 L10 10" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                                    </g>
                                </g>
                            </svg>
                        }
                        title="Save Time & Operational Costs"
                        description="Automate business processes to reduce manual errors and cut operational costs."
                    />
                    <AdvantageCard
                        icon={
                            <svg
                                className="w-20 h-20"
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                                role="img"
                                aria-label="Kemudahan Penggunaan"
                            >
                                <circle cx="100" cy="100" r="94" fill="none" stroke="#6366F1" strokeWidth="6" />

                                <rect x="44" y="46" width="112" height="76" rx="10" fill="#6366F1" />
                                <rect x="54" y="56" width="92" height="26" rx="6" fill="#ffffff" />
                                <rect x="54" y="88" width="46" height="28" rx="6" fill="#8B5CF6" />
                                <rect x="106" y="88" width="40" height="28" rx="6" fill="#A78BFA" />

                                <g transform="translate(120,58)">
                                    <path d="M0 0 L10 12 L6 12 L12 22 L2 14 L8 14 Z" fill="#FBBF24" transform="scale(0.9) translate(-2,0)" />
                                </g>

                                <g transform="translate(80,80) scale(0.7)">
                                    <path d="M4 18 L10 24 L22 8" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <circle cx="14" cy="14" r="12" fill="#D1FAE5" />
                                </g>

                                <g transform="translate(128,110) scale(0.65)">
                                    <rect x="0" y="0" width="20" height="12" rx="3" fill="#FDE68A" />
                                    <circle cx="14" cy="6" r="2" fill="#F97316" />
                                </g>

                                <g transform="translate(100,125) scale(1)">
                                    <circle cx="0" cy="-6" r="8" fill="#6366F1" />
                                    <path d="M-14 14 C-10 2 10 2 14 14 Z" fill="#6366F1" />
                                </g>

                            </svg>
                        }
                        title="Ease of Use"
                        description="No special skills required, SIKAS is easy to learn and operate by anyone."
                    />
                </div>
            </div>
        </section>
    );
};

export default AdvantagesSection;
