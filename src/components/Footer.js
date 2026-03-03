import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#5d2373] border-t border-white/4 pt-5 pb-10 text-white transition-all duration-300 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AD49E1] via-[#EBD3F8] to-[#AD49E1]"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute top-20 -left-20 w-72 h-72 bg-[#AD49E1]/20 rounded-full blur-3xl"></div>

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand & Info Section (Spans 4 columns) */}
                    <div className="lg:col-span-4 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-[#60318e] font-black text-xl shadow-xl transform hover:scale-105 transition-transform duration-300">
                                IICE
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-white mb-1">TSU R. Agladze</h2>
                                <h3 className="text-sm font-medium text-[#EBD3F8]">Institute of Inorganic Chemistry</h3>
                            </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mb-8 pr-4">
                            ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტის რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი. ვემსახურებით მეცნიერების განვითარებას 1956 წლიდან. ჩვენი მიზანია ინოვაციური კვლევები და ახალი ტექნოლოგიების დანერგვა.
                        </p>
                        <div className="flex gap-4">
                            {/* Social or Interaction buttons */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#AD49E1] hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#AD49E1] hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* About Us (Spans 2 columns) */}
                    <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white border-b-2 border-[#AD49E1] inline-block pb-2 hover:border-white transition-colors duration-300">
                            ინსტიტუტი
                        </h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/history" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>ისტორია</Link></li>
                            <li><Link href="/mission" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>მისია და ხედვა</Link></li>
                            <li><Link href="/structure" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>სტრუქტურა</Link></li>
                            <li><Link href="/statute" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>დებულება</Link></li>
                        </ul>
                    </div>

                    {/* Academic & Research (Spans 3 columns) */}
                    <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white border-b-2 border-[#AD49E1] inline-block pb-2 hover:border-white transition-colors duration-300">
                            აკადემიური
                        </h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/departments" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>სამეცნიერო განყოფილებები</Link></li>
                            <li><Link href="/scientific-council" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>სამეცნიერო საბჭო</Link></li>
                            <li><Link href="/reports" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>სამეცნიერო ანგარიშები</Link></li>
                            <li><Link href="/important-projects" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>პროექტები და გრანტები</Link></li>
                            <li><Link href="/events/seminars" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#AD49E1] scale-0 group-hover:scale-100 transition-transform"></span>სემინარები და კონფერენციები</Link></li>
                        </ul>
                    </div>

                    {/* Contact (Spans 3 columns) */}
                    <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white border-b-2 border-[#AD49E1] inline-block pb-2 hover:border-white transition-colors duration-300">
                            კონტაქტი
                        </h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4 text-sm text-white/70 group">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD49E1] transition-colors text-white">📍</span>
                                <div className="pt-1 leading-relaxed">თბილისი 0186, საქართველო<br />ქავთარაძის ქ. ილია ვეკუას #11</div>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-white/70 group">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD49E1] transition-colors text-white">📞</span>
                                <a href="tel:+995322123456" className="hover:text-white transition-colors font-medium">+(995 32) 212 34 56</a>
                            </li>
                            <li className="flex items-center gap-4 text-sm text-white/70 group">
                                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#AD49E1] transition-colors text-white">📧</span>
                                <a href="mailto:info@iice.ge" className="hover:text-white transition-colors font-medium">info@iice.ge</a>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-[#AD49E1] text-white px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:-translate-y-1 w-auto border border-white/20">
                                მოგვწერეთ
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 pb-4 flex flex-col justify-center items-center gap-4 text-xs font-medium text-white/40 text-center">
                    <p>© {new Date().getFullYear()} TSU IICE. ყველა უფლება დაცულია.</p>
                    <div className="flex justify-center gap-6">
                        <Link href="/contact" className="hover:text-white transition-colors">კონტაქტი</Link>
                        <Link href="/news" className="hover:text-white transition-colors">სიახლეები</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
