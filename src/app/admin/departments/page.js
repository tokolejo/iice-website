'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { logAudit } from '../../../lib/supabase/admin';
import { departmentsData as staticDepts } from '../../../data';
import {
    Building2,
    Edit2,
    X,
    Check,
    AlertCircle,
    Users
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

    // Close modal on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setEditingDept(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
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
            descriptionKa: dept.description_ka || dept.description || '',
            descriptionEn: dept.description_en || dept.descriptionEn || '',
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

                await logAudit({
                    action: 'UPDATE_DEPARTMENT',
                    tableName: 'departments',
                    recordId: editingDept.id,
                    details: { name: formData.nameKa },
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
        <div className="space-y-6 animate-fade-in-up">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                    <Building2 className="w-7 h-7 text-[#60318e]" />
                    განყოფილებების მართვა
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                    ინსტიტუტის სამეცნიერო მიმართულებები და განყოფილებები ({departments.length})
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {departments.map((dept) => (
                    <div
                        key={dept.id || dept.slug}
                        className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-mono font-bold bg-purple-50 text-[#60318e] px-2.5 py-1 rounded-lg">
                                    /{dept.slug || dept.id}
                                </span>
                                <button
                                    onClick={() => openEdit(dept)}
                                    className="p-1.5 rounded-lg bg-slate-100 text-[#60318e] hover:bg-[#60318e] hover:text-white transition-colors cursor-pointer"
                                    title="რედაქტირება"
                                >
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <h3 className="font-extrabold text-sm text-gray-900 mb-1 leading-snug">
                                {dept.name_ka || dept.name}
                            </h3>
                            <p className="text-xs text-gray-400 mb-3">
                                {dept.name_en || dept.nameEn}
                            </p>

                            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                                {dept.description_ka || dept.description || 'აღწერა ჯერ არ არის დამატებული.'}
                            </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-gray-400">
                            <span>ინდექსი: {dept.order_index ?? 0}</span>
                            <span className="text-[#60318e] font-bold">აქტიური</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {editingDept && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/45 backdrop-blur-md animate-fade-in transition-all"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setEditingDept(null);
                    }}
                >
                    <div
                        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-5 sm:p-8 relative border border-purple-100 max-h-[90vh] overflow-y-auto animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setEditingDept(null)}
                            className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#60318e] flex items-center justify-center">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                                    განყოფილების რედაქტირება
                                </h2>
                                <p className="text-xs text-gray-500 font-medium">
                                    განაახლეთ განყოფილების დასახელება და აღწერა
                                </p>
                            </div>
                        </div>

                        {saveError && (
                            <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <span className="font-semibold">{saveError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-4 text-sm">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                    დასახელება (ქართულად) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nameKa}
                                    onChange={(e) => setFormData(p => ({ ...p, nameKa: e.target.value }))}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-sm"
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
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                        Slug (URL მისამართი)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-mono font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-sm"
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
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                    აღწერა (ქართულად)
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.descriptionKa}
                                    onChange={(e) => setFormData(p => ({ ...p, descriptionKa: e.target.value }))}
                                    placeholder="დაწერეთ განყოფილების საქმიანობის მოკლე აღწერა..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-sm leading-relaxed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                                    Description (English)
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.descriptionEn}
                                    onChange={(e) => setFormData(p => ({ ...p, descriptionEn: e.target.value }))}
                                    placeholder="Department description in English..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-sm leading-relaxed"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingDept(null)}
                                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl transition-colors cursor-pointer text-sm"
                                >
                                    გაუქმება
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold py-3 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 text-sm"
                                >
                                    {isSaving ? 'ინახება...' : 'შენახვა'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
