'use client';

import { useState } from 'react';
import { Printer, Copy, Check, X, Globe, Award, Download, FileText, Mail } from 'lucide-react';
import { toast } from './AdminToast';
import { getTopicLabel } from '../../lib/conferenceConstants';

export default function AcceptanceLetterModal({ isOpen, onClose, registration, onSendEmail }) {
    const [lang, setLang] = useState('ka');
    const [isCopied, setIsCopied] = useState(false);

    if (!isOpen || !registration) return null;

    const reg = registration;
    const isEn = lang === 'en';

    const presentationTypeStr = reg.presentation_type === 'oral'
        ? (isEn ? 'Oral Presentation' : 'ზეპირი მოხსენება')
        : (isEn ? 'Poster Presentation' : 'სასტენდო (პოსტერული) მოხსენება');

    const todayFormatted = new Date().toLocaleDateString(isEn ? 'en-US' : 'ka-GE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const letterContentText = isEn
        ? `OFFICIAL ACCEPTANCE & INVITATION LETTER
Reference No: ${reg.abstract_number || 'IICE-2026-PENDING'}
Date: ${todayFormatted}

To: ${reg.titulation ? reg.titulation.toUpperCase() + '. ' : ''}${reg.first_name} ${reg.last_name}
Affiliation: ${reg.affiliation || 'N/A'}
Country: ${reg.citizenship || 'Georgia'}

Dear Colleague,

On behalf of the Scientific and Organizing Committee of the International Scientific Conference dedicated to the 70th Anniversary of TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry (IICE 2026), we are pleased to inform you that your abstract entitled:

"${reg.presentation_title || 'N/A'}"

has been officially reviewed and ACCEPTED for inclusion in the conference program as an:
>> ${presentationTypeStr} <<
Under the thematic topic: "${getTopicLabel(reg.thematic_topic, 'en')}"

The conference will take place in Tbilisi, Georgia, on September 24-26, 2026.
You are cordially invited to present your research findings and participate in the academic sessions.

We look forward to welcoming you to Tbilisi.

Sincerely,
Organizing Committee
TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry
Email: info@iice.ge | Web: https://iice.ge`
        : `ოფიციალური მიღებისა და მოწვევის წერილი
რეგისტრაციის №: ${reg.abstract_number || 'IICE-2026-PENDING'}
თარიღი: ${todayFormatted}

ადრესატი: ${reg.first_name} ${reg.last_name}
დაწესებულება: ${reg.affiliation || 'N/A'}
ქვეყანა: ${reg.citizenship || 'საქართველო'}

პატივცემულო კოლეგა,

თსუ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის 70 წლის იუბილესადმი მიძღვნილი საერთაშორისო სამეცნიერო კონფერენციის (IICE 2026) საორგანიზაციო კომიტეტის სახელით გაცნობებთ, რომ თქვენი წარმოდგენილი თეზისი:

„${reg.presentation_title || 'N/A'}“

ოფიციალურად განხილულ და მიღებულ იქნა კონფერენციის სამეცნიერო პროგრამაში:
>> ${presentationTypeStr} <<
სექცია: „${getTopicLabel(reg.thematic_topic, 'ka')}“

კონფერენცია გაიმართება ქ. თბილისში, 2026 წლის 24-26 სექტემბერს.
მოხარული ვიქნებით თქვენი მობრძანებით და კონფერენციის მუშაობაში მონაწილეობის მიღებით.

პატივისცემით,
საორგანიზაციო კომიტეტი
თსუ რ. აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი
ელ-ფოსტა: info@iice.ge | ვებგვერდი: https://iice.ge`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(letterContentText);
            setIsCopied(true);
            toast('წერილის ტექსტი დაკოპირდა ბუფერში!', 'success');
            setTimeout(() => setIsCopied(false), 2500);
        } catch (e) {
            toast('კოპირება ვერ მოხერხდა', 'error');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in print:p-0 print:bg-white print:static">
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
                
                {/* Modal Toolbar (hidden during print) */}
                <div className="print:hidden p-4 sm:px-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#60318e]" />
                        <h3 className="font-extrabold text-sm text-slate-800">ოფიციალური მიღების / მოწვევის წერილი</h3>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Language Switch */}
                        <div className="flex items-center bg-slate-200/80 p-0.5 rounded-xl text-xs font-bold">
                            <button
                                onClick={() => setLang('ka')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${!isEn ? 'bg-white text-[#60318e] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                ქართული
                            </button>
                            <button
                                onClick={() => setLang('en')}
                                className={`px-2.5 py-1 rounded-lg transition-all ${isEn ? 'bg-white text-[#60318e] shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                English
                            </button>
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#60318e] text-xs font-bold transition-colors cursor-pointer"
                            title="ტექსტის კოპირება"
                        >
                            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                            <span className="hidden sm:inline">{isCopied ? 'დაკოპირდა' : 'კოპირება'}</span>
                        </button>

                        {/* Print Button */}
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#60318e] hover:bg-[#4d2473] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                            title="ბეჭდვა / PDF"
                        >
                            <Printer className="w-4 h-4" />
                            <span className="hidden sm:inline">ბეჭდვა / PDF</span>
                        </button>

                        {/* Send via Email Button */}
                        {onSendEmail && (
                            <button
                                onClick={() => {
                                    onSendEmail(registration, lang);
                                    onClose();
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                                title="მეილზე გაგზავნა"
                            >
                                <Mail className="w-4 h-4" />
                                <span className="hidden sm:inline">📧 მეილზე გაგზავნა</span>
                            </button>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Letter Body (Printed area) */}
                <div className="p-8 sm:p-12 overflow-y-auto print:overflow-visible print:p-0 text-slate-800 font-sans leading-relaxed">
                    {/* Academic Header */}
                    <div className="border-b-2 border-[#60318e] pb-6 mb-8 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-purple-50 p-2 flex items-center justify-center border border-purple-100 flex-shrink-0">
                                <img src="/logo.png" alt="IICE" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-base sm:text-lg font-black text-[#2e0d42] leading-tight">
                                    {isEn ? 'TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry' : 'თსუ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტი'}
                                </h1>
                                <p className="text-xs text-slate-500 font-medium mt-1">
                                    {isEn ? 'International Scientific Conference IICE 2026' : 'საერთაშორისო სამეცნიერო კონფერენცია IICE 2026'}
                                </p>
                            </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <span className="inline-block px-2.5 py-1 bg-purple-50 text-[#60318e] border border-purple-200 rounded-lg text-xs font-mono font-bold">
                                {reg.abstract_number || 'IICE-2026'}
                            </span>
                            <p className="text-[11px] text-slate-400 mt-1">{todayFormatted}</p>
                        </div>
                    </div>

                    {/* Recipient */}
                    <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <p className="text-slate-500 font-medium">{isEn ? 'To the attention of:' : 'ადრესატი:'}</p>
                        <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                            {reg.titulation ? `${reg.titulation.toUpperCase()}. ` : ''}{reg.first_name} {reg.last_name}
                        </p>
                        <p className="text-slate-600 mt-0.5">{reg.affiliation || 'N/A'} • {reg.citizenship || (isEn ? 'Georgia' : 'საქართველო')}</p>
                    </div>

                    {/* Official Letter Text */}
                    <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">
                            {isEn ? 'Dear Colleague,' : 'პატივცემულო კოლეგა,'}
                        </p>

                        <p>
                            {isEn
                                ? 'On behalf of the Scientific and Organizing Committee of the International Scientific Conference dedicated to the 70th Anniversary of TSU R. Agladze Institute of Inorganic Chemistry and Electrochemistry (IICE 2026), we are pleased to officially inform you that your submitted abstract has been peer-reviewed and ACCEPTED for presentation:'
                                : 'თსუ რაფიელ აგლაძის სახელობის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის დაარსების 70 წლის იუბილესადმი მიძღვნილი საერთაშორისო სამეცნიერო კონფერენციის (IICE 2026) საორგანიზაციო კომიტეტის სახელით გაცნობებთ, რომ თქვენ მიერ წარმოდგენილი თეზისი განხილულ და მიღებულ იქნა სამეცნიერო პროგრამაში:'}
                        </p>

                        {/* Highlighted Paper Box */}
                        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 my-4">
                            <p className="text-[11px] font-bold text-[#60318e] uppercase tracking-wider mb-1">
                                {isEn ? 'Paper Title / თემის სათაური' : 'მოხსენების სათაური'}
                            </p>
                            <p className="text-sm sm:text-base font-black text-slate-900">
                                „{reg.presentation_title || 'N/A'}“
                            </p>
                            <div className="mt-3 pt-3 border-t border-purple-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                                <span className="font-bold text-[#60318e]">
                                    {isEn ? 'Format:' : 'ფორმატი:'} <span className="text-slate-800 font-extrabold">{presentationTypeStr}</span>
                                </span>
                                <span className="text-slate-600 font-medium">
                                    {isEn ? 'Section:' : 'სექცია:'} <span className="text-slate-800 font-semibold">{getTopicLabel(reg.thematic_topic, isEn ? 'en' : 'ka')}</span>
                                </span>
                            </div>
                        </div>

                        <p>
                            {isEn
                                ? 'The conference will take place in Tbilisi, Georgia, on September 24-26, 2026. You are cordially invited to participate in the scientific sessions, keynote lectures, and academic discussions.'
                                : 'კონფერენცია გაიმართება ქ. თბილისში, 2026 წლის 24-26 სექტემბერს. მოხარული ვიქნებით თქვენი მობრძანებით და კონფერენციის მუშაობაში მონაწილეობით.'}
                        </p>

                        <p className="text-slate-600 text-xs">
                            {isEn
                                ? 'This official acceptance letter confirms the inclusion of your abstract into the registered proceedings of the IICE 2026 Conference.'
                                : 'წინამდებარე ოფიციალური წერილი ადასტურებს თქვენი თეზისის ჩართვას IICE 2026 საერთაშორისო კონფერენციის სამეცნიერო შრომათა კრებულში.'}
                        </p>
                    </div>

                    {/* Official Signatures */}
                    <div className="mt-12 pt-6 border-t border-slate-200 flex items-end justify-between">
                        <div>
                            <p className="text-xs font-extrabold text-slate-900">
                                {isEn ? 'Organizing Committee IICE 2026' : 'IICE 2026 საორგანიზაციო კომიტეტი'}
                            </p>
                            <p className="text-[11px] text-slate-500">
                                {isEn ? 'TSU R. Agladze Institute, Tbilisi, Georgia' : 'თსუ რ. აგლაძის ინსტიტუტი, თბილისი'}
                            </p>
                            <p className="text-[11px] text-[#60318e] font-medium mt-0.5">info@iice.ge | www.iice.ge</p>
                        </div>
                        <div className="w-24 h-24 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-[10px] text-slate-400 text-center p-2">
                            <span>IICE</span>
                            <span className="font-bold text-[#60318e]">STAMP</span>
                            <span>2026</span>
                        </div>
                    </div>
                </div>

                {/* Footer close */}
                <div className="print:hidden p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                        დახურვა
                    </button>
                </div>
            </div>
        </div>
    );
}
