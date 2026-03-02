import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#2E073F] border-t border-white/5 mt-3 pt-16 pb-8 text-white transition-all duration-300">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="animate-fade-in-up">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#2E073F] font-bold shadow-lg">
                                IICE
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#EBD3F8]">IICE TSU</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Ivane Javakhishvili Tbilisi State University<br />
                            R. Agladze Institute of Inorganic Chemistry and Electrochemistry
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">
                            Quick Links
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/" className="text-[#EBD3F8] hover:text-[#AD49E1] transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/departments" className="text-[#EBD3F8] hover:text-[#AD49E1] transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>
                                    Departments
                                </Link>
                            </li>
                            <li>
                                <Link href="/staff" className="text-[#EBD3F8] hover:text-[#AD49E1] transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>
                                    Staff Directory
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Infrastructure */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">
                            Infrastructure
                        </h3>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <Link href="/infrastructure" className="text-[#EBD3F8] hover:text-[#AD49E1] transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>
                                    Laboratories
                                </Link>
                            </li>
                            <li>
                                <Link href="/important-projects" className="text-[#EBD3F8] hover:text-[#AD49E1] transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>
                                    Projects
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-white/40">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-white/60">
                                <span className="text-[#AD49E1]">📍</span>
                                <div>Tbilisi, Georgia</div>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#EBD3F8] hover:text-[#AD49E1] transition-colors">
                                <span className="text-[#AD49E1]">📧</span>
                                <a href="mailto:info@iice.ge">info@iice.ge</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/20">
                    <p>© {new Date().getFullYear()} TSU IICE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
