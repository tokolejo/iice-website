'use client';

import { useState, useEffect, useMemo } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { logAudit } from '../../../lib/supabase/admin';
import { staffData, departmentsData } from '../../../data';
import {
    Users,
    Search,
    UserPlus,
    Edit2,
    Trash2,
    UploadCloud,
    X,
    Check,
    AlertCircle,
    ExternalLink,
    Filter,
    Camera
} from 'lucide-react';

export default function AdminStaffPage() {
    const [staffList, setStaffList] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDept, setFilterDept] = useState('All');

    // Modal state for Create / Edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        firstNameKa: '',
        lastNameKa: '',
        firstNameEn: '',
        lastNameEn: '',
        positionKa: '',
        positionEn: '',
        departmentId: '',
        scientificDegreeKa: '',
        scientificDegreeEn: '',
        email: '',
        phone: '',
        photoUrl: '',
        bioKa: '',
        bioEn: '',
        cvFileUrl: '',
        googleScholarUrl: '',
        scopusUrl: '',
        webOfScienceUrl: '',
        orcidUrl: '',
        isManagement: false,
        isCouncilMember: false,
        orderIndex: 0,
        isActive: true,
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [itemToDelete, setItemToDelete] = useState(null);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                // Initialize with local data for seamless preview
                setStaffList(staffData.map(s => {
                    const [fKa, ...lKa] = s.name.split(' ');
                    const [fEn, ...lEn] = (s.nameEn || '').split(' ');
                    return {
                        id: s.id,
                        first_name_ka: fKa || '',
                        last_name_ka: lKa.join(' ') || '',
                        first_name_en: fEn || '',
                        last_name_en: lEn.join(' ') || '',
                        position_ka: s.role,
                        position_en: s.roleEn || s.role,
                        department_id: s.departmentId,
                        email: s.emails?.[0] || '',
                        photo_url: s.imageUrl || '',
                        cv_file_url: s.cvLink || '',
                        is_active: true,
                    };
                }));
                setDepartments(departmentsData);
                setIsLoading(false);
                return;
            }

            const [staffRes, deptRes] = await Promise.all([
                supabase.from('staff_members').select('*').order('order_index', { ascending: true }),
                supabase.from('departments').select('*').order('order_index', { ascending: true }),
            ]);

            if (deptRes.data && deptRes.data.length > 0) {
                setDepartments(deptRes.data);
            } else {
                setDepartments(departmentsData);
            }

            if (staffRes.data && staffRes.data.length > 0) {
                setStaffList(staffRes.data);
            } else {
                // Fallback
                setStaffList(staffData.map(s => {
                    const [fKa, ...lKa] = s.name.split(' ');
                    const [fEn, ...lEn] = (s.nameEn || '').split(' ');
                    return {
                        id: s.id,
                        first_name_ka: fKa || '',
                        last_name_ka: lKa.join(' ') || '',
                        first_name_en: fEn || '',
                        last_name_en: lEn.join(' ') || '',
                        position_ka: s.role,
                        position_en: s.roleEn || s.role,
                        department_id: s.departmentId,
                        email: s.emails?.[0] || '',
                        photo_url: s.imageUrl || '',
                        cv_file_url: s.cvLink || '',
                        is_active: true,
                    };
                }));
            }
        } catch (err) {
            console.warn('Error fetching staff list:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredList = useMemo(() => {
        return staffList.filter(s => {
            const fullName = `${s.first_name_ka || ''} ${s.last_name_ka || ''} ${s.first_name_en || ''} ${s.last_name_en || ''}`.toLowerCase();
            const matchesSearch =
                fullName.includes(searchQuery.toLowerCase()) ||
                (s.position_ka && s.position_ka.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (s.email && s.email.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesDept = filterDept === 'All' || s.department_id === filterDept;

            return matchesSearch && matchesDept;
        });
    }, [staffList, searchQuery, filterDept]);

    const openCreateModal = () => {
        setEditingMember(null);
        setFormData({
            firstNameKa: '',
            lastNameKa: '',
            firstNameEn: '',
            lastNameEn: '',
            positionKa: '',
            positionEn: '',
            departmentId: departments[0]?.id || '',
            scientificDegreeKa: '',
            scientificDegreeEn: '',
            email: '',
            phone: '',
            photoUrl: '',
            bioKa: '',
            bioEn: '',
            cvFileUrl: '',
            googleScholarUrl: '',
            scopusUrl: '',
            webOfScienceUrl: '',
            orcidUrl: '',
            isManagement: false,
            isCouncilMember: false,
            orderIndex: staffList.length + 1,
            isActive: true,
        });
        setAvatarFile(null);
        setCvFile(null);
        setSaveError('');
        setIsEditModalOpen(true);
    };

    const openEditModal = (member) => {
        setEditingMember(member);
        setFormData({
            firstNameKa: member.first_name_ka || '',
            lastNameKa: member.last_name_ka || '',
            firstNameEn: member.first_name_en || '',
            lastNameEn: member.last_name_en || '',
            positionKa: member.position_ka || '',
            positionEn: member.position_en || '',
            departmentId: member.department_id || '',
            scientificDegreeKa: member.scientific_degree_ka || '',
            scientificDegreeEn: member.scientific_degree_en || '',
            email: member.email || '',
            phone: member.phone || '',
            photoUrl: member.photo_url || '',
            bioKa: member.bio_ka || '',
            bioEn: member.bio_en || '',
            cvFileUrl: member.cv_file_url || '',
            googleScholarUrl: member.google_scholar_url || '',
            scopusUrl: member.scopus_url || '',
            webOfScienceUrl: member.web_of_science_url || '',
            orcidUrl: member.orcid_url || '',
            isManagement: !!member.is_management,
            isCouncilMember: !!member.is_council_member,
            orderIndex: member.order_index ?? 0,
            isActive: member.is_active !== false,
        });
        setAvatarFile(null);
        setCvFile(null);
        setSaveError('');
        setIsEditModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveError('');

        if (!formData.firstNameKa || !formData.lastNameKa || !formData.positionKa) {
            setSaveError('გთხოვთ შეავსოთ სავალდებულო ველები (სახელი, გვარი, პოზიცია).');
            return;
        }

        setIsSaving(true);

        try {
            const supabase = getSupabaseBrowserClient();
            let finalPhotoUrl = formData.photoUrl;
            let finalCvUrl = formData.cvFileUrl;

            if (supabase) {
                // Upload avatar if selected
                if (avatarFile) {
                    const ext = avatarFile.name.split('.').pop();
                    const filePath = `avatar_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const { error: uploadError } = await supabase.storage
                        .from('staff-avatars')
                        .upload(filePath, avatarFile);

                    if (!uploadError) {
                        const { data: { publicUrl } } = supabase.storage
                            .from('staff-avatars')
                            .getPublicUrl(filePath);
                        finalPhotoUrl = publicUrl;
                    }
                }

                // Upload CV if selected
                if (cvFile) {
                    const ext = cvFile.name.split('.').pop();
                    const filePath = `cv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const { error: uploadError } = await supabase.storage
                        .from('staff-documents')
                        .upload(filePath, cvFile);

                    if (!uploadError) {
                        const { data: { publicUrl } } = supabase.storage
                            .from('staff-documents')
                            .getPublicUrl(filePath);
                        finalCvUrl = publicUrl;
                    }
                }

                const recordData = {
                    first_name_ka: formData.firstNameKa,
                    last_name_ka: formData.lastNameKa,
                    first_name_en: formData.firstNameEn || null,
                    last_name_en: formData.lastNameEn || null,
                    position_ka: formData.positionKa,
                    position_en: formData.positionEn || null,
                    department_id: formData.departmentId || null,
                    scientific_degree_ka: formData.scientificDegreeKa || null,
                    scientific_degree_en: formData.scientificDegreeEn || null,
                    email: formData.email || null,
                    phone: formData.phone || null,
                    photo_url: finalPhotoUrl || null,
                    bio_ka: formData.bioKa || null,
                    bio_en: formData.bioEn || null,
                    cv_file_url: finalCvUrl || null,
                    google_scholar_url: formData.googleScholarUrl || null,
                    scopus_url: formData.scopusUrl || null,
                    web_of_science_url: formData.webOfScienceUrl || null,
                    orcid_url: formData.orcidUrl || null,
                    is_management: formData.isManagement,
                    is_council_member: formData.isCouncilMember,
                    order_index: Number(formData.orderIndex) || 0,
                    is_active: formData.isActive,
                };

                if (editingMember) {
                    const { error } = await supabase
                        .from('staff_members')
                        .update(recordData)
                        .eq('id', editingMember.id);

                    if (error) throw error;

                    await logAudit({
                        action: 'UPDATE_STAFF',
                        tableName: 'staff_members',
                        recordId: editingMember.id,
                        details: { name: `${formData.firstNameKa} ${formData.lastNameKa}` },
                    });
                } else {
                    const { data, error } = await supabase
                        .from('staff_members')
                        .insert([recordData])
                        .select()
                        .single();

                    if (error) throw error;

                    await logAudit({
                        action: 'CREATE_STAFF',
                        tableName: 'staff_members',
                        recordId: data?.id,
                        details: { name: `${formData.firstNameKa} ${formData.lastNameKa}` },
                    });
                }
            }

            // Update state locally
            await loadData();
            setIsEditModalOpen(false);
            setEditingMember(null);
        } catch (err) {
            console.error('Save staff error:', err);
            setSaveError(err.message || 'დაფიქსირდა შეცდომა შენახვისას');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                await supabase.from('staff_members').delete().eq('id', itemToDelete.id);
                await logAudit({
                    action: 'DELETE_STAFF',
                    tableName: 'staff_members',
                    recordId: itemToDelete.id,
                    details: { name: `${itemToDelete.first_name_ka} ${itemToDelete.last_name_ka}` },
                });
            }
            setStaffList(prev => prev.filter(s => s.id !== itemToDelete.id));
            setItemToDelete(null);
        } catch (err) {
            console.error('Delete staff error:', err);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Users className="w-7 h-7 text-[#60318e]" />
                        თანამშრომლების მართვა (Staff)
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        სამეცნიერო პერსონალის, ხელმძღვანელებისა და კონტაქტების ბაზა ({staffList.length})
                    </p>
                </div>

                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>ახალი თანამშრომლის დამატება</span>
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm flex flex-col md:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ძიება: სახელი, გვარი, პოზიცია, იმეილი..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                    />
                </div>

                <select
                    value={filterDept}
                    onChange={(e) => setFilterDept(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white w-full md:w-64"
                >
                    <option value="All">ყველა განყოფილება</option>
                    {departments.map((d) => (
                        <option key={d.id || d.slug} value={d.id || d.slug}>
                            {d.name_ka || d.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Staff Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-4">ფოტო</th>
                                <th className="py-3.5 px-4">სახელი, გვარი</th>
                                <th className="py-3.5 px-4">თანამდებობა</th>
                                <th className="py-3.5 px-4">კონტაქტი</th>
                                <th className="py-3.5 px-4 text-center">სტატუსი</th>
                                <th className="py-3.5 px-4 text-right">მოქმედება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება პერსონალი...
                                    </td>
                                </tr>
                            ) : filteredList.length > 0 ? (
                                filteredList.map((member) => (
                                    <tr key={member.id} className="hover:bg-purple-50/40 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-purple-50 border border-purple-100 flex items-center justify-center">
                                                {member.photo_url ? (
                                                    <img
                                                        src={member.photo_url}
                                                        alt={member.first_name_ka}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Users className="w-5 h-5 text-[#AD49E1]/50" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-bold text-gray-900">
                                                {member.first_name_ka} {member.last_name_ka}
                                            </div>
                                            {member.first_name_en && (
                                                <div className="text-[11px] text-gray-400">
                                                    {member.first_name_en} {member.last_name_en}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 max-w-xs truncate font-medium">
                                            {member.position_ka}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500">
                                            {member.email ? (
                                                <a href={`mailto:${member.email}`} className="text-[#60318e] hover:underline truncate block">
                                                    {member.email}
                                                </a>
                                            ) : (
                                                <span className="text-gray-300">—</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-center whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                member.is_active !== false
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {member.is_active !== false ? 'აქტიური' : 'არააქტიური'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => openEditModal(member)}
                                                    className="p-1.5 rounded-lg bg-slate-100 text-[#60318e] hover:bg-[#60318e] hover:text-white transition-colors cursor-pointer"
                                                    title="რედაქტირება"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => setItemToDelete(member)}
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
                                    <td colSpan={6} className="py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Search className="w-8 h-8 text-gray-300 mb-1" />
                                            <p className="font-semibold text-xs">მითითებული პარამეტრით თანამშრომელი ვერ მოიძებნა</p>
                                            {(searchQuery || filterDept !== 'All') && (
                                                <button
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setFilterDept('All');
                                                    }}
                                                    className="mt-2 text-[11px] font-bold text-[#60318e] hover:text-[#7A1CAC] bg-purple-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-purple-200"
                                                >
                                                    ფილტრის გასუფთავება ✕
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create / Edit Staff Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative border border-purple-100">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-black text-gray-900 mb-2">
                            {editingMember ? 'თანამშრომლის რედაქტირება' : 'ახალი თანამშრომლის დამატება'}
                        </h2>
                        <p className="text-xs text-gray-500 mb-6">
                            შეიყვანეთ ინფორმაცია ქართულ და ინგლისურ ენებზე
                        </p>

                        {saveError && (
                            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{saveError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-4 text-xs">
                            {/* Names */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">სახელი (ქართულად) *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.firstNameKa}
                                        onChange={(e) => setFormData(p => ({ ...p, firstNameKa: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">გვარი (ქართულად) *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.lastNameKa}
                                        onChange={(e) => setFormData(p => ({ ...p, lastNameKa: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">First Name (English)</label>
                                    <input
                                        type="text"
                                        value={formData.firstNameEn}
                                        onChange={(e) => setFormData(p => ({ ...p, firstNameEn: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">Last Name (English)</label>
                                    <input
                                        type="text"
                                        value={formData.lastNameEn}
                                        onChange={(e) => setFormData(p => ({ ...p, lastNameEn: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                            </div>

                            {/* Position & Department */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">თანამდებობა (ქართულად) *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.positionKa}
                                        onChange={(e) => setFormData(p => ({ ...p, positionKa: e.target.value }))}
                                        placeholder="მაგ: მთავარი მეცნიერი თანამშრომელი"
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">Position (English)</label>
                                    <input
                                        type="text"
                                        value={formData.positionEn}
                                        onChange={(e) => setFormData(p => ({ ...p, positionEn: e.target.value }))}
                                        placeholder="e.g., Principal Researcher"
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">განყოფილება</label>
                                    <select
                                        value={formData.departmentId}
                                        onChange={(e) => setFormData(p => ({ ...p, departmentId: e.target.value }))}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] bg-white"
                                    >
                                        <option value="">(არცერთი)</option>
                                        {departments.map((d) => (
                                            <option key={d.id || d.slug} value={d.id || d.slug}>
                                                {d.name_ka || d.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">ელ-ფოსტა</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                        placeholder="example@tsu.ge"
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                            </div>

                            {/* Photo & CV File Upload */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-purple-50/40 rounded-2xl border border-purple-100">
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">პროფილის ფოტო</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                                        className="text-[11px] text-gray-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                    />
                                    {formData.photoUrl && !avatarFile && (
                                        <span className="text-[10px] text-gray-400 block mt-1 truncate">
                                            მიმდინარე: {formData.photoUrl}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">CV ფაილი (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                                        className="text-[11px] text-gray-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#60318e] file:text-white cursor-pointer"
                                    />
                                    {formData.cvFileUrl && !cvFile && (
                                        <span className="text-[10px] text-gray-400 block mt-1 truncate">
                                            მიმდინარე: {formData.cvFileUrl}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Academic Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">Google Scholar URL</label>
                                    <input
                                        type="url"
                                        value={formData.googleScholarUrl}
                                        onChange={(e) => setFormData(p => ({ ...p, googleScholarUrl: e.target.value }))}
                                        placeholder="https://scholar.google.com/..."
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">ORCID / Scopus URL</label>
                                    <input
                                        type="url"
                                        value={formData.orcidUrl}
                                        onChange={(e) => setFormData(p => ({ ...p, orcidUrl: e.target.value }))}
                                        placeholder="https://orcid.org/..."
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                                    />
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="flex flex-wrap gap-4 pt-2">
                                <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))}
                                        className="text-[#60318e] rounded"
                                    />
                                    <span>აქტიური</span>
                                </label>

                                <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.isManagement}
                                        onChange={(e) => setFormData(p => ({ ...p, isManagement: e.target.checked }))}
                                        className="text-[#60318e] rounded"
                                    />
                                    <span>დირექცია (Administration)</span>
                                </label>

                                <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.isCouncilMember}
                                        onChange={(e) => setFormData(p => ({ ...p, isCouncilMember: e.target.checked }))}
                                        className="text-[#60318e] rounded"
                                    />
                                    <span>სამეცნიერო საბჭოს წევრი</span>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                                >
                                    გაუქმება
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold py-2.5 rounded-xl transition-colors shadow-md cursor-pointer disabled:opacity-50"
                                >
                                    {isSaving ? 'ინახება...' : 'შენახვა'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {itemToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center border border-red-100">
                        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-2">თანამშრომლის წაშლა</h3>
                        <p className="text-xs text-gray-500 mb-6">
                            ნამდვილად გსურთ <strong>{itemToDelete.first_name_ka} {itemToDelete.last_name_ka}</strong>-ის წაშლა?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setItemToDelete(null)}
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
