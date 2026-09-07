'use client';

import { useState, useEffect, useMemo } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { recordAuditLog } from '../../../lib/auditLogger';
import AdminModal from '../../../components/admin/AdminModal';
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
    Globe,
    CheckSquare,
    Square,
    ArrowUpDown,
    FileSpreadsheet,
    FileCode,
    Sparkles,
    RefreshCw,
    Printer,
    Loader2,
    UploadCloud,
    Archive
} from 'lucide-react';
import { toast } from '../../../components/admin/AdminToast';

export const STATUS_CONFIG = {
    pending: {
        labelKa: 'მოლოდინში',
        labelEn: 'Pending',
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500'
    },
    accepted_oral: {
        labelKa: 'მიღებულია (ზეპირი)',
        labelEn: 'Accepted (Oral)',
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500'
    },
    accepted_poster: {
        labelKa: 'მიღებულია (სასტენდო)',
        labelEn: 'Accepted (Poster)',
        bg: 'bg-teal-50 text-teal-700 border-teal-200',
        dot: 'bg-teal-500'
    },
    revision_needed: {
        labelKa: 'გადასამუშავებელი',
        labelEn: 'Needs Revision',
        bg: 'bg-orange-50 text-orange-700 border-orange-200',
        dot: 'bg-orange-500'
    },
    rejected: {
        labelKa: 'უარყოფილია',
        labelEn: 'Rejected',
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500'
    }
};

const TOPICS = [
    'All',
    'ნანოპროცესები და ნანოტექნოლოგიები',
    'სასარგებლო წიაღისეულისა და მეორადი ნედლეულის გადამუშავების ფუნდამენტური და ტექნოლოგიური ასპექტები',
    'მწვანე ქიმია',
    'სამეცნიერო ინოვაციების პოპულარიზაცია და კომერციალიზაცია',
    'სურსათის ქიმია და ხარისხი',
    'STEM+P: მეცნიერება, ინოვაცია და პოლიტიკა',
];

export default function AdminConferencePage() {
    const [registrations, setRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTopic, setFilterTopic] = useState('All');
    const [filterType, setFilterType] = useState('All');
    const [filterAttendance, setFilterAttendance] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('date-desc');

    // Selection state
    const [selectedIds, setSelectedIds] = useState(new Set());

    // Modal state
    const [selectedReg, setSelectedReg] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Status update state
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    // File & ZIP action state
    const [downloadingFile, setDownloadingFile] = useState(null);
    const [isUploadingFile, setIsUploadingFile] = useState(false);
    const [isZipping, setIsZipping] = useState(false);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                // Mock data for local preview
                setRegistrations([
                    {
                        id: 'demo-1',
                        abstract_number: 'IICE-2026-001',
                        first_name: 'ნიკოლოზ',
                        last_name: 'ნიორაძე',
                        birth_date: '1985-04-12',
                        email: 'nikoloz.nioradze@tsu.ge',
                        affiliation: 'TSU IICE',
                        citizenship: 'Georgia',
                        titulation: 'dr',
                        gender: 'male',
                        presentation_title: 'Electrochemical Synthesis of Nanostructured Materials',
                        co_authors: 'G. Tatishvili, T. Lezhava',
                        presentation_type: 'oral',
                        participation_role: 'presenting_author',
                        thematic_topic: 'ნანოპროცესები და ნანოტექნოლოგიები',
                        is_attending_in_person: true,
                        abstract_file_geo_url: 'https://example.com/demo_geo.docx',
                        abstract_file_eng_url: 'https://example.com/demo_eng.docx',
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

    // File download helper (forces blob download with proper filename)
    const handleDownloadFile = async (url, customName) => {
        if (!url) return;
        try {
            setDownloadingFile(url);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Download request failed');
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = customName || 'abstract_document';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (e) {
            console.warn('Direct blob download error, falling back to window.open:', e);
            window.open(url, '_blank');
        } finally {
            setDownloadingFile(null);
        }
    };

    // Admin direct file upload/attachment to existing participant
    const handleAdminFileUpload = async (e, type) => {
        const file = e.target.files?.[0];
        if (!file || !selectedReg) return;

        try {
            setIsUploadingFile(true);
            const supabase = getSupabaseBrowserClient();
            if (!supabase) throw new Error('Supabase client not available');

            const ext = (file.name.split('.').pop() || 'docx').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'docx';
            const filePath = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

            const { error: upErr } = await supabase.storage
                .from('conference-abstracts')
                .upload(filePath, file, { upsert: true });

            if (upErr) throw upErr;

            const { data: { publicUrl } } = supabase.storage
                .from('conference-abstracts')
                .getPublicUrl(filePath);

            const updatePayload = type === 'geo'
                ? { abstract_file_geo_url: publicUrl }
                : { abstract_file_eng_url: publicUrl };

            const { error: dbErr } = await supabase
                .from('conference_registrations_2026')
                .update(updatePayload)
                .eq('id', selectedReg.id);

            if (dbErr) throw dbErr;

            setSelectedReg(prev => ({ ...prev, ...updatePayload }));
            setRegistrations(prev => prev.map(r => r.id === selectedReg.id ? { ...r, ...updatePayload } : r));

            toast(type === 'geo' ? 'ქართული თეზისის ფაილი წარმატებით მიემაგრა!' : 'ინგლისური თეზისის ფაილი წარმატებით მიემაგრა!', 'success');
        } catch (err) {
            console.error('Admin file upload error:', err);
            toast(`ფაილის ატვირთვის შეცდომა: ${err.message}`, 'error');
        } finally {
            setIsUploadingFile(false);
            e.target.value = '';
        }
    };

    // Update status
    const handleUpdateStatus = async (regId, newStatus) => {
        setIsUpdatingStatus(true);
        try {
            const supabase = getSupabaseBrowserClient();
            const updatePayload = { status: newStatus };

            if (supabase) {
                const { error } = await supabase
                    .from('conference_registrations_2026')
                    .update(updatePayload)
                    .eq('id', regId);

                if (error) {
                    if (error.message?.includes("'status' column") || error.code === 'PGRST204') {
                        throw new Error("Supabase-ის ცხრილში 'status' სვეტი ჯერ არ არის დამატებული. გთხოვთ გაუშვათ SQL ბრძანება: ALTER TABLE public.conference_registrations_2026 ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';");
                    }
                    throw error;
                }
            }

            setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, ...updatePayload } : r));
            if (selectedReg && selectedReg.id === regId) {
                setSelectedReg(prev => ({ ...prev, ...updatePayload }));
            }

            toast('სტატუსი წარმატებით განახლდა!', 'success');

            try {
                await recordAuditLog({
                    action: 'CONFERENCE_STATUS_UPDATE',
                    tableName: 'conference_registrations_2026',
                    recordId: regId,
                    details: updatePayload
                });
            } catch (e) {
                console.warn('Audit error on status update:', e);
            }
        } catch (err) {
            console.error('Status update error:', err);
            toast('სტატუსის განახლება ვერ მოხერხდა: ' + err.message, 'error', 6000);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    // Bulk download abstract files into a ZIP archive
    const handleBulkDownloadZip = async (items) => {
        if (!items || items.length === 0) {
            toast('არცერთი მონაწილე არ არის არჩეული', 'info');
            return;
        }

        setIsZipping(true);
        toast('აბსტრაქტების ZIP არქივის მომზადება დაიწყო...', 'info');

        try {
            const JSZip = (await import('jszip')).default;
            const zip = new JSZip();
            let filesCount = 0;

            for (const r of items) {
                const safeName = `${r.first_name || ''}_${r.last_name || ''}`.replace(/[\/\\?%*:|"<>]/g, '_').trim();
                const abstractNum = r.abstract_number || 'IICE-2026';

                // Georgian abstract file
                if (r.abstract_file_geo_url) {
                    try {
                        const ext = r.abstract_file_geo_url.split('.').pop()?.split('?')[0] || 'docx';
                        const resp = await fetch(r.abstract_file_geo_url);
                        if (resp.ok) {
                            const blob = await resp.blob();
                            zip.file(`${abstractNum}_${safeName}_GEO.${ext}`, blob);
                            filesCount++;
                        }
                    } catch (e) {
                        console.warn(`Failed downloading geo file for ${safeName}:`, e);
                    }
                }

                // English abstract file
                if (r.abstract_file_eng_url) {
                    try {
                        const ext = r.abstract_file_eng_url.split('.').pop()?.split('?')[0] || 'docx';
                        const resp = await fetch(r.abstract_file_eng_url);
                        if (resp.ok) {
                            const blob = await resp.blob();
                            zip.file(`${abstractNum}_${safeName}_ENG.${ext}`, blob);
                            filesCount++;
                        }
                    } catch (e) {
                        console.warn(`Failed downloading eng file for ${safeName}:`, e);
                    }
                }
            }

            if (filesCount === 0) {
                toast('შერჩეულ მონაწილეებს არ აქვთ ატვირთული თეზისების ფაილები', 'error');
                return;
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const dateStamp = new Date().toISOString().slice(0, 10);
            const zipUrl = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = zipUrl;
            link.download = `IICE_2026_Abstracts_${dateStamp}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(zipUrl);

            toast(`წარმატებით მომზადდა ZIP არქივი (${filesCount} ფაილი)!`, 'success');
        } catch (err) {
            console.error('Error generating bulk ZIP:', err);
            toast('ZIP არქივის შექმნა ვერ მოხერხდა: ' + err.message, 'error');
        } finally {
            setIsZipping(false);
        }
    };

    // Filter & Sort
    const filteredAndSortedList = useMemo(() => {
        let result = registrations.filter(reg => {
            const fullName = `${reg.first_name || ''} ${reg.last_name || ''}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchQuery.toLowerCase()) ||
                (reg.abstract_number && reg.abstract_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (reg.email && reg.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (reg.affiliation && reg.affiliation.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (reg.presentation_title && reg.presentation_title.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTopic = filterTopic === 'All' || reg.thematic_topic === filterTopic;
            const matchesType = filterType === 'All' || reg.presentation_type === filterType;
            const matchesAttendance = filterAttendance === 'All' ||
                (filterAttendance === 'in_person' && reg.is_attending_in_person) ||
                (filterAttendance === 'online' && !reg.is_attending_in_person);
            const statusKey = reg.status || 'pending';
            const matchesStatus = filterStatus === 'All' || statusKey === filterStatus;

            return matchesSearch && matchesTopic && matchesType && matchesAttendance && matchesStatus;
        });

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'date-desc') {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            }
            if (sortBy === 'date-asc') {
                return new Date(a.created_at || 0) - new Date(b.created_at || 0);
            }
            if (sortBy === 'name-asc') {
                const nameA = `${a.first_name || ''} ${a.last_name || ''}`;
                const nameB = `${b.first_name || ''} ${b.last_name || ''}`;
                return nameA.localeCompare(nameB, 'ka');
            }
            if (sortBy === 'name-desc') {
                const nameA = `${a.first_name || ''} ${a.last_name || ''}`;
                const nameB = `${b.first_name || ''} ${b.last_name || ''}`;
                return nameB.localeCompare(nameA, 'ka');
            }
            if (sortBy === 'abstract-asc') {
                return (a.abstract_number || '').localeCompare(b.abstract_number || '');
            }
            if (sortBy === 'abstract-desc') {
                return (b.abstract_number || '').localeCompare(a.abstract_number || '');
            }
            return 0;
        });

        return result;
    }, [registrations, searchQuery, filterTopic, filterType, filterAttendance, filterStatus, sortBy]);

    // Selection helpers
    const isAllSelected = filteredAndSortedList.length > 0 &&
        filteredAndSortedList.every(r => selectedIds.has(r.id));

    const handleToggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds(new Set());
        } else {
            const next = new Set(selectedIds);
            filteredAndSortedList.forEach(r => next.add(r.id));
            setSelectedIds(next);
        }
    };

    const handleToggleSelectRow = (id) => {
        const next = new Set(selectedIds);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setSelectedIds(next);
    };

    // Generic Export Handler covering all fields
    const exportParticipants = (items, format = 'csv') => {
        if (!items || items.length === 0) return;

        const headers = [
            'Abstract Number (თეზისის #)',
            'Status (სტატუსი)',
            'Registration Date (რეგისტრაციის თარიღი)',
            'First Name (სახელი)',
            'Last Name (გვარი)',
            'Birth Date (დაბადების თარიღი)',
            'Email (ელ-ფოსტა)',
            'Citizenship (მოქალაქეობა)',
            'Affiliation (სამუშაო ადგილი/ორგანიზაცია)',
            'Titulation (აკადემიური ხარისხი)',
            'Gender (სქესი)',
            'Attendance (მონაწილეობის ფორმატი)',
            'Presentation Title (მოხსენების სათაური)',
            'Co-Authors (თანაავტორები)',
            'Presentation Type (მოხსენების ტიპი)',
            'Participation Role (როლი)',
            'Thematic Topic (თემატური მიმართულება)',
            'GEO Abstract URL (ქართული თეზისის ბმული)',
            'ENG Abstract URL (ინგლისური თეზისის ბმული)'
        ];

        const rows = items.map(r => {
            const st = STATUS_CONFIG[r.status] || STATUS_CONFIG.pending;
            return [
                r.abstract_number || '',
                st.labelKa,
                new Date(r.created_at).toLocaleString('ka-GE'),
                r.first_name || '',
                r.last_name || '',
                r.birth_date || '',
                r.email || '',
                r.citizenship || '',
                r.affiliation || '',
                r.titulation || '',
                r.gender || '',
                r.is_attending_in_person ? 'In-Person (პირისპირ)' : 'Online (ონლაინ)',
                r.presentation_title || '',
                r.co_authors || '',
                r.presentation_type || '',
                r.participation_role || '',
                r.thematic_topic || '',
                r.abstract_file_geo_url || '',
                r.abstract_file_eng_url || ''
            ];
        });

        const timestamp = new Date().toISOString().slice(0, 10);

        if (format === 'json') {
            const jsonBlob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(jsonBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `IICE_Conference_2026_${timestamp}.json`;
            link.click();
            URL.revokeObjectURL(url);
            return;
        }

        if (format === 'excel') {
            // Excel HTML table with UTF-8 encoding
            let tableHtml = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
            tableHtml += '<head><meta charset="utf-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Conference Registrations</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>';
            tableHtml += '<body><table border="1">';
            tableHtml += '<tr style="background-color: #60318e; color: #ffffff; font-weight: bold;">';
            headers.forEach(h => { tableHtml += `<th>${h}</th>`; });
            tableHtml += '</tr>';

            rows.forEach(row => {
                tableHtml += '<tr>';
                row.forEach(cell => {
                    const safe = String(cell || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    tableHtml += `<td>${safe}</td>`;
                });
                tableHtml += '</tr>';
            });

            tableHtml += '</table></body></html>';

            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `IICE_Conference_2026_${timestamp}.xls`;
            link.click();
            URL.revokeObjectURL(url);
            return;
        }

        // CSV (Default) with UTF-8 BOM
        const csvContent = '\uFEFF' + [
            headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
            ...rows.map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `IICE_Conference_2026_${timestamp}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                await supabase.from('conference_registrations_2026').delete().eq('id', itemToDelete.id);
                await recordAuditLog({
                    action: 'CONFERENCE_DELETE',
                    tableName: 'conference_registrations_2026',
                    recordId: itemToDelete.id,
                    details: {
                        abstract_number: itemToDelete.abstract_number,
                        name: `${itemToDelete.first_name} ${itemToDelete.last_name}`,
                        email: itemToDelete.email
                    }
                });
            }

            setRegistrations(prev => prev.filter(r => r.id !== itemToDelete.id));
            if (selectedReg?.id === itemToDelete.id) setSelectedReg(null);
            setSelectedIds(prev => {
                const next = new Set(prev);
                next.delete(itemToDelete.id);
                return next;
            });
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        } catch (err) {
            console.error('Delete registration error:', err);
        }
    };

    // Selected list
    const selectedList = useMemo(() => {
        return registrations.filter(r => selectedIds.has(r.id));
    }, [registrations, selectedIds]);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header & Export Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Calendar className="w-7 h-7 text-[#60318e]" />
                        კონფერენცია 2026: მონაწილეები & თეზისები
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        სრული მონაცემთა ბაზა, თეზისების ფაილები, მრავალმხრივი სორტირება და ექსპორტი (სულ: {registrations.length})
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={fetchRegistrations}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-50 text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                        title="მონაცემების განახლება"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 text-[#60318e] ${isLoading ? 'animate-spin' : ''}`} />
                        <span>განახლება</span>
                    </button>

                    {/* Bulk ZIP Download Button for All Filtered */}
                    <button
                        onClick={() => handleBulkDownloadZip(filteredAndSortedList)}
                        disabled={isZipping || filteredAndSortedList.length === 0}
                        className="px-3.5 py-2 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-[#60318e] text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        title="ყველა გაფილტრული თეზისის ZIP არქივად ჩამოტვირთვა"
                    >
                        {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Archive className="w-3.5 h-3.5" />}
                        <span>თეზისების ZIP</span>
                    </button>

                    {/* Export All Dropdown */}
                    <div className="relative group">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-xl bg-[#60318e] hover:bg-[#4a2470] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <Download className="w-3.5 h-3.5" />
                            <span>ყველას ექსპორტი ({filteredAndSortedList.length})</span>
                        </button>
                        <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl shadow-xl border border-purple-100 p-1.5 hidden group-hover:block z-30 animate-fade-in">
                            <button
                                onClick={() => exportParticipants(filteredAndSortedList, 'csv')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-700 hover:bg-purple-50 hover:text-[#60318e] rounded-xl flex items-center gap-2 cursor-pointer"
                            >
                                <FileDown className="w-3.5 h-3.5 text-[#60318e]" />
                                <span>CSV (Excel-თავსებადი)</span>
                            </button>
                            <button
                                onClick={() => exportParticipants(filteredAndSortedList, 'excel')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-700 hover:bg-purple-50 hover:text-[#60318e] rounded-xl flex items-center gap-2 cursor-pointer"
                            >
                                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Excel ცხრილი (.xls)</span>
                            </button>
                            <button
                                onClick={() => exportParticipants(filteredAndSortedList, 'json')}
                                className="w-full text-left px-3 py-2 text-xs font-bold text-gray-700 hover:bg-purple-50 hover:text-[#60318e] rounded-xl flex items-center gap-2 cursor-pointer"
                            >
                                <FileCode className="w-3.5 h-3.5 text-blue-600" />
                                <span>JSON მონაცემები</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter & Sort Bar */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    {/* Search */}
                    <div className="md:col-span-3 relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ძიება: სახელი, თეზისი #, ელ-ფოსტა..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all"
                        />
                    </div>

                    {/* Filter Topic */}
                    <div className="md:col-span-3">
                        <select
                            value={filterTopic}
                            onChange={(e) => setFilterTopic(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white truncate"
                            title={filterTopic}
                        >
                            {TOPICS.map(t => (
                                <option key={t} value={t}>
                                    {t === 'All' ? 'ყველა თემატიკა' : t}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filter Type */}
                    <div className="md:col-span-2">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                        >
                            <option value="All">ყველა ტიპი</option>
                            <option value="oral">ზეპირი (Oral)</option>
                            <option value="online">ონლაინ (Online)</option>
                            <option value="poster">სასტენდო (Poster)</option>
                            <option value="abstract_only">მხოლოდ თეზისი</option>
                        </select>
                    </div>

                    {/* Filter Attendance */}
                    <div className="md:col-span-2">
                        <select
                            value={filterAttendance}
                            onChange={(e) => setFilterAttendance(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                        >
                            <option value="All">ყველა ფორმატი</option>
                            <option value="in_person">პირისპირ</option>
                            <option value="online">ონლაინ</option>
                        </select>
                    </div>

                    {/* Filter Status */}
                    <div className="md:col-span-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-purple-200 bg-purple-50/50 text-xs font-bold text-[#60318e] focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                        >
                            <option value="All">ყველა სტატუსი</option>
                            <option value="pending">მოლოდინში</option>
                            <option value="accepted_oral">მიღებულია (Oral)</option>
                            <option value="accepted_poster">მიღებულია (Poster)</option>
                            <option value="revision_needed">გადასამუშავებელი</option>
                            <option value="rejected">უარყოფილია</option>
                        </select>
                    </div>
                </div>

                {/* Sub-bar: Sort & Stats */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">
                        ნაჩვენებია <strong className="text-slate-800">{filteredAndSortedList.length}</strong> / {registrations.length} მონაწილე
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">დალაგება:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white font-bold text-gray-700"
                        >
                            <option value="date-desc">უახლესი თარიღით</option>
                            <option value="date-asc">ძველი თარიღით</option>
                            <option value="name-asc">სახელი (ა-ჰ)</option>
                            <option value="name-desc">სახელი (ჰ-ა)</option>
                            <option value="abstract-asc">თეზისი # (ზრდადი)</option>
                            <option value="abstract-desc">თეზისი # (კლებადი)</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Bulk Selection Action Bar */}
            {selectedIds.size > 0 && (
                <div className="bg-[#2e0d42] text-white rounded-2xl p-3.5 px-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg animate-fade-in border border-purple-500/30">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                            {selectedIds.size}
                        </span>
                        <span className="text-xs font-bold">
                            მონიშნულია {selectedIds.size} მონაწილე
                        </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Bulk ZIP */}
                        <button
                            onClick={() => handleBulkDownloadZip(selectedList)}
                            disabled={isZipping}
                            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                            {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Archive className="w-3.5 h-3.5" />}
                            <span>თეზისების ZIP ({selectedIds.size})</span>
                        </button>

                        <button
                            onClick={() => exportParticipants(selectedList, 'csv')}
                            className="px-3 py-1.5 rounded-xl bg-white text-[#60318e] hover:bg-purple-50 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                            <FileDown className="w-3.5 h-3.5" />
                            <span>CSV</span>
                        </button>

                        <button
                            onClick={() => exportParticipants(selectedList, 'excel')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            <span>Excel</span>
                        </button>

                        <button
                            onClick={() => exportParticipants(selectedList, 'json')}
                            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                            <FileCode className="w-3.5 h-3.5" />
                            <span>JSON</span>
                        </button>

                        <button
                            onClick={() => setSelectedIds(new Set())}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                            გაუქმება
                        </button>
                    </div>
                </div>
            )}

            {/* Registrations Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-4 w-10 text-center">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleToggleSelectAll}
                                        className="w-4 h-4 accent-[#60318e] cursor-pointer rounded"
                                        title="ყველას მონიშვნა"
                                    />
                                </th>
                                <th className="py-3.5 px-4 whitespace-nowrap">თეზისის #</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">მონაწილე</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">ორგანიზაცია</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">მოხსენების სათაური</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">ფორმატი</th>
                                <th className="py-3.5 px-4 whitespace-nowrap">სტატუსი</th>
                                <th className="py-3.5 px-4 text-center whitespace-nowrap">თეზისის ფაილები</th>
                                <th className="py-3.5 px-4 text-right whitespace-nowrap">მოქმედება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={9} className="py-14 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება მონაწილეები...
                                    </td>
                                </tr>
                            ) : filteredAndSortedList.length > 0 ? (
                                filteredAndSortedList.map((reg) => {
                                    const isSelected = selectedIds.has(reg.id);
                                    return (
                                        <tr
                                            key={reg.id}
                                            className={`transition-colors ${
                                                isSelected ? 'bg-purple-50/70' : 'hover:bg-purple-50/30'
                                            }`}
                                        >
                                            <td className="py-3.5 px-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleToggleSelectRow(reg.id)}
                                                    className="w-4 h-4 accent-[#60318e] cursor-pointer rounded"
                                                />
                                            </td>

                                            <td className="py-3.5 px-4 font-mono font-bold text-[#60318e] whitespace-nowrap">
                                                {reg.abstract_number}
                                            </td>

                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <div className="font-bold text-gray-900">
                                                    {reg.first_name} {reg.last_name}
                                                </div>
                                                <div className="text-[11px] text-gray-400 font-mono">{reg.email}</div>
                                            </td>

                                            <td className="py-3.5 px-4 text-gray-700 max-w-[170px] truncate" title={reg.affiliation}>
                                                {reg.affiliation}
                                            </td>

                                            <td className="py-3.5 px-4 text-gray-800 max-w-xs truncate font-medium" title={reg.presentation_title}>
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

                                            {/* Status Badge */}
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                {(() => {
                                                    const st = STATUS_CONFIG[reg.status] || STATUS_CONFIG.pending;
                                                    return (
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.bg}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}></span>
                                                            <span>{st.labelKa}</span>
                                                        </span>
                                                    );
                                                })()}
                                            </td>

                                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {reg.abstract_file_geo_url ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDownloadFile(
                                                                reg.abstract_file_geo_url,
                                                                `${reg.abstract_number}_GEO_${reg.last_name || 'abstract'}.docx`
                                                            )}
                                                            title="ქართული თეზისის გადმოწერა"
                                                            className="px-2 py-0.5 rounded-md bg-purple-100 text-[#60318e] text-[10px] font-bold hover:bg-[#60318e] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <FileDown className="w-3 h-3" />
                                                            <span>GEO</span>
                                                        </button>
                                                    ) : null}

                                                    {reg.abstract_file_eng_url ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDownloadFile(
                                                                reg.abstract_file_eng_url,
                                                                `${reg.abstract_number}_ENG_${reg.last_name || 'abstract'}.docx`
                                                            )}
                                                            title="ინგლისური თეზისის გადმოწერა"
                                                            className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold hover:bg-indigo-700 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <FileDown className="w-3 h-3" />
                                                            <span>ENG</span>
                                                        </button>
                                                    ) : null}

                                                    {!reg.abstract_file_geo_url && !reg.abstract_file_eng_url && (
                                                        <span className="text-gray-300 text-[11px]">—</span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {/* Single Participant Export */}
                                                    <button
                                                        onClick={() => exportParticipants([reg], 'csv')}
                                                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                                                        title="ამ მონაწილის ექსპორტი (CSV)"
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                    </button>

                                                    <button
                                                        onClick={() => setSelectedReg(reg)}
                                                        className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-[#60318e] hover:text-white transition-colors cursor-pointer"
                                                        title="სრული დეტალები"
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
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={9} className="py-14 text-center text-gray-400">
                                        მოთხოვნილი პარამეტრებით მონაწილეები ვერ მოიძებნა.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal via Portal AdminModal */}
            <AdminModal
                isOpen={Boolean(selectedReg)}
                onClose={() => setSelectedReg(null)}
                title={selectedReg ? `${selectedReg.first_name} ${selectedReg.last_name}` : 'განაცხადის დეტალები'}
                subtitle={selectedReg ? `თეზისის ნომერი: ${selectedReg.abstract_number}` : ''}
                icon={FileText}
                maxWidth="max-w-2xl"
                footer={
                    <div className="flex items-center justify-between w-full">
                        {selectedReg && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => exportParticipants([selectedReg], 'csv')}
                                    className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-purple-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer"
                                >
                                    <FileDown className="w-3.5 h-3.5 text-[#60318e]" />
                                    <span>CSV</span>
                                </button>
                                <button
                                    onClick={() => exportParticipants([selectedReg], 'excel')}
                                    className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-emerald-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 cursor-pointer"
                                >
                                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Excel</span>
                                </button>
                            </div>
                        )}
                        <button
                            onClick={() => setSelectedReg(null)}
                            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#60318e] hover:bg-[#4a2470] text-white shadow-xs transition-colors cursor-pointer"
                        >
                            დახურვა
                        </button>
                    </div>
                }
            >
                {selectedReg && (
                    <div className="space-y-5 text-xs text-gray-700">
                        {/* Status Management Card */}
                        <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="text-xs font-extrabold text-[#60318e] uppercase tracking-wider block">
                                    თეზისის სტატუსი
                                </span>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                    აირჩიეთ განაცხადის მიმდინარე გადაწყვეტილება
                                </p>
                            </div>

                            <div className="w-full sm:w-72">
                                <select
                                    value={selectedReg.status || 'pending'}
                                    onChange={(e) => handleUpdateStatus(selectedReg.id, e.target.value)}
                                    disabled={isUpdatingStatus}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-300 bg-purple-50/50 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] cursor-pointer"
                                >
                                    <option value="pending">⏳ მოლოდინში (Pending)</option>
                                    <option value="accepted_oral">✅ მიღებულია (ზეპირი მოხსენება)</option>
                                    <option value="accepted_poster">📌 მიღებულია (სასტენდო მოხსენება)</option>
                                    <option value="revision_needed">⚠️ საჭიროებს გადამუშავებას (Revision)</option>
                                    <option value="rejected">❌ უარყოფილია (Rejected)</option>
                                </select>
                            </div>
                        </div>

                        {/* Status & Key Metrics */}
                        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-purple-600 block">თეზისის ნომერი</span>
                                <span className="font-mono text-base font-black text-gray-900">{selectedReg.abstract_number}</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-purple-600 block">რეგისტრაციის თარიღი</span>
                                <span className="font-semibold text-gray-800">{new Date(selectedReg.created_at).toLocaleString('ka-GE')}</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-purple-600 block">ფორმატი</span>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                    selectedReg.is_attending_in_person
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {selectedReg.is_attending_in_person ? 'In-Person (პირისპირ)' : 'Online (ონლაინ)'}
                                </span>
                            </div>
                        </div>

                        {/* Attached Abstract Files Section */}
                        <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#60318e] flex items-center gap-1.5">
                                    <FileText className="w-4 h-4" />
                                    <span>მიმაგრებული თეზისის ფაილები (Abstract Documents)</span>
                                </span>
                                {isUploadingFile && (
                                    <span className="text-[11px] font-semibold text-purple-600 flex items-center gap-1 animate-pulse">
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        <span>მიმდინარეობს ატვირთვა...</span>
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* GEO Abstract Card */}
                                <div className="p-3.5 rounded-2xl bg-white border border-purple-200/80 shadow-xs flex flex-col justify-between gap-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#60318e] flex items-center justify-center font-bold text-xs flex-shrink-0">
                                                GEO
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-xs">ქართული თეზისი</p>
                                                <p className="text-[10px] text-gray-400">
                                                    {selectedReg.abstract_file_geo_url ? 'დოკუმენტი ატვირთულია' : 'ფაილი არ არის ატვირთული'}
                                                </p>
                                            </div>
                                        </div>
                                        {selectedReg.abstract_file_geo_url && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                                <CheckCircle2 className="w-3 h-3" />
                                                აქტიური
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                                        {selectedReg.abstract_file_geo_url ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDownloadFile(
                                                        selectedReg.abstract_file_geo_url,
                                                        `${selectedReg.abstract_number}_GEO_${selectedReg.last_name || 'abstract'}.docx`
                                                    )}
                                                    disabled={downloadingFile === selectedReg.abstract_file_geo_url}
                                                    className="flex-1 px-3 py-1.5 rounded-xl bg-[#60318e] hover:bg-[#4a2470] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                                                >
                                                    {downloadingFile === selectedReg.abstract_file_geo_url ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Download className="w-3.5 h-3.5" />
                                                    )}
                                                    <span>ჩამოტვირთვა</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => window.open(selectedReg.abstract_file_geo_url, '_blank')}
                                                    className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#60318e] font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer border border-purple-200"
                                                    title="გახსნა და ბეჭდვა"
                                                >
                                                    <Printer className="w-3.5 h-3.5" />
                                                    <span>ბეჭდვა</span>
                                                </button>

                                                <label className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer" title="ფაილის შეცვლა">
                                                    <RefreshCw className="w-3.5 h-3.5" />
                                                    <input
                                                        type="file"
                                                        accept=".doc,.docx,.pdf"
                                                        onChange={(e) => handleAdminFileUpload(e, 'geo')}
                                                        className="hidden"
                                                        disabled={isUploadingFile}
                                                    />
                                                </label>
                                            </>
                                        ) : (
                                            <label className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#60318e] border border-dashed border-purple-300 hover:border-[#60318e] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                                                <UploadCloud className="w-4 h-4" />
                                                <span>+ ფაილის მიმაგრება (GEO)</span>
                                                <input
                                                    type="file"
                                                    accept=".doc,.docx,.pdf"
                                                    onChange={(e) => handleAdminFileUpload(e, 'geo')}
                                                    className="hidden"
                                                    disabled={isUploadingFile}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* ENG Abstract Card */}
                                <div className="p-3.5 rounded-2xl bg-white border border-indigo-200/80 shadow-xs flex flex-col justify-between gap-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                                ENG
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-xs">ინგლისური თეზისი</p>
                                                <p className="text-[10px] text-gray-400">
                                                    {selectedReg.abstract_file_eng_url ? 'დოკუმენტი ატვირთულია' : 'ფაილი არ არის ატვირთული'}
                                                </p>
                                            </div>
                                        </div>
                                        {selectedReg.abstract_file_eng_url && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                                                <CheckCircle2 className="w-3 h-3" />
                                                აქტიური
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                                        {selectedReg.abstract_file_eng_url ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDownloadFile(
                                                        selectedReg.abstract_file_eng_url,
                                                        `${selectedReg.abstract_number}_ENG_${selectedReg.last_name || 'abstract'}.docx`
                                                    )}
                                                    disabled={downloadingFile === selectedReg.abstract_file_eng_url}
                                                    className="flex-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                                                >
                                                    {downloadingFile === selectedReg.abstract_file_eng_url ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                    ) : (
                                                        <Download className="w-3.5 h-3.5" />
                                                    )}
                                                    <span>ჩამოტვირთვა</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => window.open(selectedReg.abstract_file_eng_url, '_blank')}
                                                    className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer border border-indigo-200"
                                                    title="გახსნა და ბეჭდვა"
                                                >
                                                    <Printer className="w-3.5 h-3.5" />
                                                    <span>ბეჭდვა</span>
                                                </button>

                                                <label className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer" title="ფაილის შეცვლა">
                                                    <RefreshCw className="w-3.5 h-3.5" />
                                                    <input
                                                        type="file"
                                                        accept=".doc,.docx,.pdf"
                                                        onChange={(e) => handleAdminFileUpload(e, 'eng')}
                                                        className="hidden"
                                                        disabled={isUploadingFile}
                                                    />
                                                </label>
                                            </>
                                        ) : (
                                            <label className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-dashed border-indigo-300 hover:border-indigo-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                                                <UploadCloud className="w-4 h-4" />
                                                <span>+ ფაილის მიმაგრება (ENG)</span>
                                                <input
                                                    type="file"
                                                    accept=".doc,.docx,.pdf"
                                                    onChange={(e) => handleAdminFileUpload(e, 'eng')}
                                                    className="hidden"
                                                    disabled={isUploadingFile}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div>
                            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2.5 uppercase tracking-wider text-[11px]">
                                პირადი და საკონტაქტო მონაცემები
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">სახელი, გვარი</span>
                                    <span className="font-bold text-gray-900">{selectedReg.first_name} {selectedReg.last_name}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">ელ-ფოსტა</span>
                                    <span className="font-mono text-gray-800 break-all">{selectedReg.email}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">დაბადების თარიღი</span>
                                    <span className="font-medium text-gray-700">{selectedReg.birth_date || '—'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">მოქალაქეობა</span>
                                    <span className="font-medium text-gray-700">{selectedReg.citizenship || '—'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">ორგანიზაცია</span>
                                    <span className="font-medium text-gray-700">{selectedReg.affiliation || '—'}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">ხარისხი / წოდება</span>
                                    <span className="font-medium text-gray-700">{selectedReg.titulation || '—'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Presentation Details */}
                        <div>
                            <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-1.5 mb-2.5 uppercase tracking-wider text-[11px]">
                                მოხსენების მონაცემები
                            </h4>
                            <div className="space-y-2.5">
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">მოხსენების სათაური</span>
                                    <p className="font-bold text-gray-900 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                        {selectedReg.presentation_title}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <span className="text-gray-400 block text-[10px] uppercase font-bold">თანაავტორები</span>
                                        <span className="font-medium text-gray-700">{selectedReg.co_authors || '—'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block text-[10px] uppercase font-bold">მოხსენების ტიპი</span>
                                        <span className="font-medium text-gray-700 capitalize">{selectedReg.presentation_type || '—'}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[10px] uppercase font-bold">თემატური მიმართულება</span>
                                    <span className="font-semibold text-[#60318e] block mt-0.5">{selectedReg.thematic_topic || '—'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AdminModal>

            {/* Delete Confirmation Modal */}
            <AdminModal
                isOpen={isDeleteModalOpen && Boolean(itemToDelete)}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setItemToDelete(null);
                }}
                title="განაცხადის წაშლა"
                icon={Trash2}
                maxWidth="max-w-md"
                footer={
                    <div className="flex items-center justify-end gap-2 w-full">
                        <button
                            onClick={() => {
                                setIsDeleteModalOpen(false);
                                setItemToDelete(null);
                            }}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            გაუქმება
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer"
                        >
                            წაშლა
                        </button>
                    </div>
                }
            >
                {itemToDelete && (
                    <p className="text-xs text-gray-600 leading-relaxed">
                        დარწმუნებული ხართ, რომ გსურთ წაშალოთ <strong>{itemToDelete.first_name} {itemToDelete.last_name}</strong>-ს
                        განაცხადი (თეზისი: <code>{itemToDelete.abstract_number}</code>)?
                        ეს მოქმედება შეუქცევადია.
                    </p>
                )}
            </AdminModal>
        </div>
    );
}
