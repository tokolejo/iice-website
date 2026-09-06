'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { recordAuditLog } from '../../../lib/auditLogger';
import { departmentsData as staticDepts } from '../../../data';
import AdminModal from '../../../components/admin/AdminModal';
import RichTextEditor from '../../../components/RichTextEditor';
import {
    Building2,
    Edit2,
    Check,
    AlertCircle,
    Users,
    Globe,
    Layers
} from 'lucide-react';

export default function AdminDepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingDept, setEditingDept] = useState(null);
    const [formData, setFormData] = useState({
        nameKa: '',
        nameEn: '',
        slug: '',
        descriptionKa: '',
        descriptionEn: '',
        orderIndex: 0,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');

    useEffect(() => {
        const supabase = getSupabaseBrowserClient();
        if (supabase) {
            supabase.auth.getUser().then(({ data: { user } }) => {
                if (user?.email) setCurrentUserEmail(user.email);
            });
        }
    }, []);

    const loadDepartments = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                setDepartments(staticDepts);
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('departments')
                .select('*')
                .order('order_index', { ascending: true });

            if (data && data.length > 0) {
                setDepartments(data);
            } else {
                setDepartments(staticDepts);
            }
        } catch (err) {
            console.warn('Load departments notice:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    const openEdit = (dept) => {
        setEditingDept(dept);
        setFormData({
            nameKa: dept.name_ka || dept.name || '',
            nameEn: dept.name_en || dept.nameEn || '',
            slug: dept.slug || dept.id || '',
            descriptionKa: dept.description_ka || (Array.isArray(dept.descriptionKa) ? dept.descriptionKa.join('<br/><br/>') : dept.description || ''),
            descriptionEn: dept.description_en || (Array.isArray(dept.descriptionEn) ? dept.descriptionEn.join('<br/><br/>') : dept.descriptionEn || ''),
            orderIndex: dept.order_index ?? 0,
        });
        setSaveError('');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveError('');
        setIsSaving(true);

        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase && editingDept.id) {
                const { error } = await supabase
                    .from('departments')
                    .update({
                        name_ka: formData.nameKa,
                        name_en: formData.nameEn,
                        slug: formData.slug,
                        description_ka: formData.descriptionKa,
                        description_en: formData.descriptionEn,
                        order_index: Number(formData.orderIndex) || 0,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', editingDept.id);

                if (error) throw error;

                // Centralized audit log
                await recordAuditLog({
                    userEmail: currentUserEmail,
                    action: 'DEPARTMENT_UPDATE',
                    tableName: 'departments',
                    recordId: editingDept.id,
                    details: {
                        departmentId: editingDept.id,
                        nameKa: formData.nameKa,
                        nameEn: formData.nameEn,
                        slug: formData.slug,
                        orderIndex: formData.orderIndex,
                    },
                });
            }

            await loadDepartments();
            setEditingDept(null);
        } catch (err) {
            console.error('Update department error:', err);
            setSaveError(err.message || 'დაფიქსირდა შეცდომა');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Building2 className="w-7 h-7 text-[#60318e]" />
                        განყოფილებების მართვა
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        ინსტიტუტის სამეცნიერო მიმართულებები და განყოფილებები ({departments.length})
                    </p>
                </div>
            </div>

            {/* Department Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {departments.map((dept) => (
                    <div
                        key={dept.id || dept.slug}
                        className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-mono font-bold bg-purple-50 text-[#60318e] px-2.5 py-1 rounded-lg">
                                    /{dept.slug || dept.id}
                                </span>
                                <button
                                    onClick={() => openEdit(dept)}
                                    className="p-1.5 rounded-xl bg-slate-100 text-[#60318e] hover:bg-[#60318e] hover:text-white transition-colors cursor-pointer"
                                    title="რედაქტირება"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            <h3 className="font-extrabold text-sm text-gray-900 mb-1 leading-snug">
                                {dept.name_ka || dept.name}
                            </h3>
                            <p className="text-xs text-gray-400 mb-3 font-medium">
                                {dept.name_en || dept.nameEn}
                            </p>

                            <div
                                className="text-xs text-gray-600 line-clamp-3 leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: dept.description_ka ||
                                        (Array.isArray(dept.descriptionKa) ? dept.descriptionKa.join(' ') : dept.description || 'აღწერა ჯერ არ არის დამატებული.')
                                }}
                            />
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-400">
                            <span>ინდექსი: {dept.order_index ?? 0}</span>
                            <span className="text-[#60318e] font-bold">აქტიური</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* AdminModal for Department Editing with TipTap */}
            <AdminModal
                isOpen={Boolean(editingDept)}
                onClose={() => setEditingDept(null)}
                title="განყოფილების რედაქტირება"
                subtitle="განაახლეთ განყოფილების დასახელება და აღწერა TipTap ფორმატირებით"
                icon={Building2}
                maxWidth="max-w-3xl"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setEditingDept(null)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm"
                        >
                            გაუქმება
                        </button>
                        <button
                            type="submit"
                            form="department-form"
                            disabled={isSaving}
                            className="bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
                        >
                            {isSaving ? 'ინახება...' : 'შენახვა'}
                        </button>
                    </>
                }
            >
                {saveError && (
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="font-semibold">{saveError}</span>
                    </div>
                )}

                <form id="department-form" onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                დასახელება (ქართულად) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.nameKa}
                                onChange={(e) => setFormData(p => ({ ...p, nameKa: e.target.value }))}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60318e] shadow-xs"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                Name (English) *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.nameEn}
                                onChange={(e) => setFormData(p => ({ ...p, nameEn: e.target.value }))}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60318e] shadow-xs"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                Slug (URL იდენტიფიკატორი)
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-mono font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60318e] shadow-xs"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                რიგითი ნომერი (Order)
                            </label>
                            <input
                                type="number"
                                value={formData.orderIndex}
                                onChange={(e) => setFormData(p => ({ ...p, orderIndex: e.target.value }))}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60318e] shadow-xs"
                            />
                        </div>
                    </div>

                    {/* TipTap Rich Text Editor for Georgian Description */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#60318e] uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            აღწერა (ქართულად) — TipTap რედაქტორი
                        </label>
                        <RichTextEditor
                            content={formData.descriptionKa}
                            onChange={(html) => setFormData(p => ({ ...p, descriptionKa: html }))}
                            placeholder="შეიყვანეთ განყოფილების საქმიანობის დეტალური აღწერა..."
                        />
                    </div>

                    {/* TipTap Rich Text Editor for English Description */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#60318e] uppercase tracking-wider flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5" />
                            Description (English) — TipTap Editor
                        </label>
                        <RichTextEditor
                            content={formData.descriptionEn}
                            onChange={(html) => setFormData(p => ({ ...p, descriptionEn: html }))}
                            placeholder="Enter detailed department description in English..."
                        />
                    </div>
                </form>
            </AdminModal>
        </div>
    );
}
