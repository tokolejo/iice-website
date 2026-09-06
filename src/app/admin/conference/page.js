'use client';

import { useState, useEffect, useMemo } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { logAudit } from '../../../lib/supabase/admin';
import {
    Calendar,
    Search,
    Download,
    Eye,
    Trash2,
    Filter,
    FileText,
    CheckCircle2,
    X,
    ExternalLink,
    FileDown,
    Building,
    User,
    Mail,
    Globe
} from 'lucide-react';

export default function AdminConferencePage() {
    const [registrations, setRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTopic, setFilterTopic] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [selectedReg, setSelectedReg] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                // Mock data for preview/development
                setRegistrations([
                    {
                        id: 'demo-1',
                        abstract_number: 'IICE-2026-001',
                        first_name: 'ნიკოლოზ',
                        last_name: 'ნიორაძე',
                        email: 'nikoloz.nioradze@tsu.ge',
                        affiliation: 'TSU IICE',
                        citizenship: 'Georgia',
                        titulation: 'dr',
                        gender: 'male',
                        presentation_title: 'Electrochemical Synthesis of Nanostructured Materials',
                        co_authors: 'G. Tatishvili, T. Lezhava',
                        presentation_type: 'oral',
                        participation_role: 'presenting_author',
                        thematic_topic: 'electrochemistry',
                        is_attending_in_person: true,
                        abstract_file_geo_url: null,
                        abstract_file_eng_url: null,
                        created_at: new Date().toISOString(),
                    }
                ]);
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('conference_registrations_2026')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setRegistrations(data);
            }
        } catch (err) {
            console.warn('Error fetching conference registrations:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const filteredList = useMemo(() => {
        return registrations.filter(reg => {
            const fullName = `${reg.first_name || ''} ${reg.last_name || ''}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchQuery.toLowerCase()) ||
                (reg.abstract_number && reg.abstract_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (reg.email && reg.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (reg.affiliation && reg.affiliation.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (reg.presentation_title && reg.presentation_title.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTopic = filterTopic === 'All' || reg.thematic_topic === filterTopic;
            const matchesType = filterType === 'All' || reg.presentation_type === filterType;

            return matchesSearch && matchesTopic && matchesType;
        });
    }, [registrations, searchQuery, filterTopic, filterType]);

    const handleExportCSV = () => {
        if (filteredList.length === 0) return;

        const headers = [
            'Abstract Number',
            'First Name',
            'Last Name',
            'Email',
            'Citizenship',
            'Affiliation',
            'Titulation',
            'Gender',
            'Attendance',
            'Presentation Title',
            'Co-Authors',
            'Presentation Type',
            'Role',
            'Topic',
            'GEO Abstract URL',
            'ENG Abstract URL',
            'Registered At'
        ];

        const rows = filteredList.map(r => [
            `"${r.abstract_number || ''}"`,
            `"${r.first_name || ''}"`,
            `"${r.last_name || ''}"`,
            `"${r.email || ''}"`,
            `"${r.citizenship || ''}"`,
            `"${(r.affiliation || '').replace(/"/g, '""')}"`,
            `"${r.titulation || ''}"`,
            `"${r.gender || ''}"`,
            `"${r.is_attending_in_person ? 'In-Person' : 'Online'}"`,
            `"${(r.presentation_title || '').replace(/"/g, '""')}"`,
            `"${(r.co_authors || '').replace(/"/g, '""')}"`,
            `"${r.presentation_type || ''}"`,
            `"${r.participation_role || ''}"`,
            `"${r.thematic_topic || ''}"`,
            `"${r.abstract_file_geo_url || ''}"`,
            `"${r.abstract_file_eng_url || ''}"`,
            `"${new Date(r.created_at).toLocaleString()}"`
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `IICE_2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                await supabase
                    .from('conference_registrations_2026')
                    .delete()
                    .eq('id', itemToDelete.id);

                await logAudit({
                    action: 'DELETE_CONFERENCE_REGISTRATION',
                    tableName: 'conference_registrations_2026',
                    recordId: itemToDelete.id,
                    details: { abstract_number: itemToDelete.abstract_number, email: itemToDelete.email },
                });
            }

            setRegistrations(prev => prev.filter(r => r.id !== itemToDelete.id));
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
            if (selectedReg?.id === itemToDelete.id) {
                setSelectedReg(null);
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Calendar className="w-7 h-7 text-[#60318e]" />
                        კონფერენცია 2026: რეგისტრაციები
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        III საერთაშორისო კონფერენციის განაცხადების და თეზისების მართვა ({registrations.length})
                    </p>
                </div>

                <button
                    onClick={handleExportCSV}
                    disabled={filteredList.length === 0}
                    className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                    <FileDown className="w-4 h-4" />
                    <span>CSV-ში ექსპორტი ({filteredList.length})</span>
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ძიება: სახელი, ნომერი, იმეილი, ორგანიზაცია, სათაური..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        value={filterTopic}
                        onChange={(e) => setFilterTopic(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white flex-1 md:w-48"
                    >
                        <option value="All">ყველა თემატიკა</option>
                        <option value="electrochemistry">ელექტროქიმია</option>
                        <option value="inorganic-chemistry">არაორგანული ქიმია</option>
                        <option value="nanotech">ნანოტექნოლოგიები</option>
                        <option value="chemical-engineering">ქიმიური ინჟინერია</option>
                        <option value="green-chemistry">მწვანე ქიმია</option>
                        <option value="bio-chemistry">ბიოაქტიური ნაერთები</option>
                    </select>

                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white flex-1 md:w-40"
                    >
                        <option value="All">ყველა ტიპი</option>
                        <option value="oral">ზეპირი (Oral)</option>
                        <option value="online">ონლაინ (Online)</option>
                        <option value="poster">სასტენდო (Poster)</option>
                        <option value="abstract_only">მხოლოდ თეზისი</option>
                    </select>
                </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-4">თეზისის #</th>
                                <th className="py-3.5 px-4">მონაწილე</th>
                                <th className="py-3.5 px-4">ორგანიზაცია</th>
                                <th className="py-3.5 px-4">მოხსენების სათაური</th>
                                <th className="py-3.5 px-4">ფორმატი</th>
                                <th className="py-3.5 px-4 text-center">ფაილები</th>
                                <th className="py-3.5 px-4 text-right">მოქმედება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება მონაცემები...
                                    </td>
                                </tr>
                            ) : filteredList.length > 0 ? (
                                filteredList.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-purple-50/40 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-bold text-[#60318e] whitespace-nowrap">
                                            {reg.abstract_number}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-bold text-gray-900">
                                                {reg.first_name} {reg.last_name}
                                            </div>
                                            <div className="text-[11px] text-gray-400">{reg.email}</div>
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-700 max-w-[180px] truncate">
                                            {reg.affiliation}
                                        </td>
                                        <td className="py-3.5 px-4 text-gray-800 max-w-xs truncate font-medium">
                                            {reg.presentation_title}
                                        </td>
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                reg.is_attending_in_person
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                            }`}>
                                                {reg.is_attending_in_person ? 'In-Person' : 'Online'}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-1.5">
                                                {reg.abstract_file_geo_url ? (
                                                    <a
                                                        href={reg.abstract_file_geo_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="GEO Abstract"
                                                        className="px-2 py-0.5 rounded bg-purple-100 text-[#60318e] text-[10px] font-bold hover:bg-[#60318e] hover:text-white transition-colors"
                                                    >
                                                        GEO
                                                    </a>
                                                ) : null}
                                                {reg.abstract_file_eng_url ? (
                                                    <a
                                                        href={reg.abstract_file_eng_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title="ENG Abstract"
                                                        className="px-2 py-0.5 rounded bg-purple-100 text-[#60318e] text-[10px] font-bold hover:bg-[#60318e] hover:text-white transition-colors"
                                                    >
                                                        ENG
                                                    </a>
                                                ) : null}
                                                {!reg.abstract_file_geo_url && !reg.abstract_file_eng_url && (
                                                    <span className="text-gray-300 text-[11px]">—</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => setSelectedReg(reg)}
                                                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-[#60318e] hover:text-white transition-colors cursor-pointer"
                                                    title="დეტალები"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setItemToDelete(reg);
                                                        setIsDeleteModalOpen(true);
                                                    }}
                                                    className="p-1.5 rounded-lg bg-slate-100 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                                                    title="წაშლა"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-400">
                                        რეგისტრაციები არ მოიძებნა.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {selectedReg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative border border-purple-100">
                        <button
                            onClick={() => setSelectedReg(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="font-mono text-sm font-black text-[#60318e] bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
                                {selectedReg.abstract_number}
                            </span>
                            <span className="text-xs text-gray-400">
                                {new Date(selectedReg.created_at).toLocaleString('ka-GE')}
                            </span>
                        </div>

                        <h2 className="text-xl font-black text-gray-900 mb-1">
                            {selectedReg.first_name} {selectedReg.last_name}
                        </h2>
                        <p className="text-xs text-[#AD49E1] font-bold mb-6">
                            {selectedReg.affiliation} ({selectedReg.citizenship})
                        </p>

                        <div className="space-y-4 text-xs">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                                <h4 className="font-bold text-[#60318e] text-[11px] uppercase tracking-wider">
                                    მოხსენების დეტალები
                                </h4>
                                <p className="text-sm font-extrabold text-gray-900">
                                    {selectedReg.presentation_title}
                                </p>
                                {selectedReg.co_authors && (
                                    <p className="text-gray-600">
                                        <strong>თანაავტორები:</strong> {selectedReg.co_authors}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">
                                        ტიპი: {selectedReg.presentation_type}
                                    </span>
                                    <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">
                                        როლი: {selectedReg.participation_role}
                                    </span>
                                    <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">
                                        თემატიკა: {selectedReg.thematic_topic}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100">
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">ელ-ფოსტა</span>
                                    <a href={`mailto:${selectedReg.email}`} className="text-xs font-bold text-[#60318e] hover:underline">
                                        {selectedReg.email}
                                    </a>
                                </div>
                                <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100">
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">ხარისხი / სქესი</span>
                                    <span className="text-xs font-bold text-gray-800">
                                        {selectedReg.titulation} • {selectedReg.gender}
                                    </span>
                                </div>
                            </div>

                            {/* Files */}
                            <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/30">
                                <h4 className="font-bold text-[#60318e] text-[11px] uppercase tracking-wider mb-3">
                                    ატვირთული თეზისები
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                    {selectedReg.abstract_file_geo_url ? (
                                        <a
                                            href={selectedReg.abstract_file_geo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#60318e] text-white font-bold px-3.5 py-2 rounded-xl text-xs hover:bg-[#7A1CAC] transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>ქართული თეზისი (GEO)</span>
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-xs">ქართული თეზისი არ არის ატვირთული</span>
                                    )}

                                    {selectedReg.abstract_file_eng_url ? (
                                        <a
                                            href={selectedReg.abstract_file_eng_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-[#60318e] text-white font-bold px-3.5 py-2 rounded-xl text-xs hover:bg-[#7A1CAC] transition-colors"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            <span>ინგლისური თეზისი (ENG)</span>
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-xs">ინგლისური თეზისი არ არის ატვირთული</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setSelectedReg(null)}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                            >
                                დახურვა
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center border border-red-100">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">განაცხადის წაშლა</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            ნამდვილად გსურთ <strong>{itemToDelete.abstract_number}</strong>-ის წაშლა?
                            ეს ქმედება შეუქცევადია.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setItemToDelete(null);
                                }}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors"
                            >
                                გაუქმება
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                            >
                                წაშლა
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
