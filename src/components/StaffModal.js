import { useEffect } from 'react';

export default function StaffModal({ isOpen, onClose, member }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !member) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all flex flex-col sm:flex-row">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1 z-10 bg-white shadow-sm"
                >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Image Section */}
                <div className="sm:w-1/3 bg-gray-50 flex items-center justify-center p-6 border-b sm:border-b-0 sm:border-r border-gray-100 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none min-h-[300px]">
                    <img
                        src={member.imageUrl || '/placeholder-user.png'}
                        alt={member.name}
                        className="max-h-64 max-w-full object-contain drop-shadow-md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-user.png';
                        }}
                    />
                </div>

                {/* Info Section */}
                <div className="sm:w-2/3 p-6 sm:p-8 flex flex-col">
                    <h2 className="text-2xl font-bold text-primary mb-1">{member.name}</h2>
                    <p className="text-lg font-medium text-gray-800 mb-2">{member.role}</p>
                    <p className="text-sm text-text-body mb-6 border-b border-gray-100 pb-4">
                        {member.department}
                    </p>

                    <div className="flex-grow space-y-4">
                        {/* Contact Details */}
                        {member.emails && member.emails.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Contact</h4>
                                <ul className="space-y-1">
                                    {member.emails.map((email, idx) => (
                                        <li key={idx}>
                                            <a href={`mailto:${email}`} className="text-sm text-primary hover:underline break-all">
                                                {email}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Scientific Links */}
                        {member.links && member.links.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Scientific Profiles</h4>
                                <div className="flex flex-wrap gap-2">
                                    {member.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-50 text-primary text-xs font-medium hover:bg-primary hover:text-white transition-colors border border-purple-100"
                                        >
                                            {link.title}
                                            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BIO Link if present */}
                        {member.bioLink && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <a
                                    href={member.bioLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex justify-center items-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                                    style={{ backgroundColor: 'var(--color-primary)' }}
                                >
                                    View Full BIO Document
                                    <svg className="ml-2 -mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
