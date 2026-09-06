'use client';

import { useState, useEffect, useMemo } from 'react';
import { getSupabaseBrowserClient } from '../../../lib/supabase/client';
import { recordAuditLog } from '../../../lib/auditLogger';
import { newsData as staticNews } from '../../../data/newsData';
import RichTextEditor from '../../../components/RichTextEditor';
import AdminModal from '../../../components/admin/AdminModal';
import {
    Newspaper,
    Search,
    Plus,
    Edit2,
    Trash2,
    UploadCloud,
    X,
    Calendar,
    AlertCircle,
    Eye
} from 'lucide-react';

export default function AdminNewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        titleKa: '',
        titleEn: '',
        slug: '',
        contentKa: '',
        contentEn: '',
        coverImageUrl: '',
        status: 'published',
    });
    const [coverFile, setCoverFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [itemToDelete, setItemToDelete] = useState(null);

    // Close modals on ESC key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsEditModalOpen(false);
                setItemToDelete(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const loadNews = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                setNewsList(staticNews.map(n => ({
                    id: String(n.id),
                    title_ka: n.title,
                    title_en: n.titleEn || n.title,
                    slug: n.slug || `news-${n.id}`,
                    content_ka: n.content,
                    content_en: n.contentEn,
                    cover_image_url: n.image,
                    status: 'published',
                    published_at: n.date,
                })));
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('news')
                .select('*')
                .order('published_at', { ascending: false });

            if (data && data.length > 0) {
                setNewsList(data);
            } else {
                setNewsList(staticNews.map(n => ({
                    id: String(n.id),
                    title_ka: n.title,
                    title_en: n.titleEn || n.title,
                    slug: n.slug || `news-${n.id}`,
                    content_ka: n.content,
                    content_en: n.contentEn,
                    cover_image_url: n.image,
                    status: 'published',
                    published_at: n.date,
                })));
            }
        } catch (err) {
            console.warn('Load news notice:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, []);

    const filteredList = useMemo(() => {
        return newsList.filter(n => {
            const fullTitle = `${n.title_ka || ''} ${n.title_en || ''}`.toLowerCase();
            return fullTitle.includes(searchQuery.toLowerCase());
        });
    }, [newsList, searchQuery]);

    const openCreate = () => {
        setEditingNews(null);
        setFormData({
            titleKa: '',
            titleEn: '',
            slug: '',
            contentKa: '',
            contentEn: '',
            coverImageUrl: '',
            status: 'published',
        });
        setCoverFile(null);
        setSaveError('');
        setIsEditModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingNews(item);
        setFormData({
            titleKa: item.title_ka || '',
            titleEn: item.title_en || '',
            slug: item.slug || '',
            contentKa: item.content_ka || '',
            contentEn: item.content_en || '',
            coverImageUrl: item.cover_image_url || '',
            status: item.status || 'published',
        });
        setCoverFile(null);
        setSaveError('');
        setIsEditModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaveError('');

        if (!formData.titleKa || !formData.contentKa) {
            setSaveError('სათაური და ტექსტი ქართულად სავალდებულოა.');
            return;
        }

        setIsSaving(true);

        try {
            const supabase = getSupabaseBrowserClient();
            let finalCoverUrl = formData.coverImageUrl;

            if (supabase) {
                if (coverFile) {
                    const ext = coverFile.name.split('.').pop();
                    const filePath = `news_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
                    const { error: uploadError } = await supabase.storage
                        .from('news-media')
                        .upload(filePath, coverFile);

                    if (!uploadError) {
                        const { data: { publicUrl } } = supabase.storage
                            .from('news-media')
                            .getPublicUrl(filePath);
                        finalCoverUrl = publicUrl;
                    }
                }

                const generatedSlug = formData.slug || `news-${Date.now()}`;
                const payload = {
                    title_ka: formData.titleKa,
                    title_en: formData.titleEn || null,
                    slug: generatedSlug,
                    content_ka: formData.contentKa,
                    content_en: formData.contentEn || null,
                    cover_image_url: finalCoverUrl || null,
                    status: formData.status,
                    updated_at: new Date().toISOString(),
                };

                if (editingNews) {
                    const { error } = await supabase
                        .from('news')
                        .update(payload)
                        .eq('id', editingNews.id);

                    if (error) throw error;

                    await recordAuditLog({
                        action: 'NEWS_UPDATE',
                        tableName: 'news',
                        recordId: editingNews.id,
                        details: { title: formData.titleKa, status: formData.status },
                    });
                } else {
                    payload.published_at = new Date().toISOString();
                    const { data, error } = await supabase
                        .from('news')
                        .insert([payload])
                        .select()
                        .single();

                    if (error) throw error;

                    await recordAuditLog({
                        action: 'NEWS_CREATE',
                        tableName: 'news',
                        recordId: data?.id,
                        details: { title: formData.titleKa, status: formData.status },
                    });
                }
            }

            await loadNews();
            setIsEditModalOpen(false);
            setEditingNews(null);
        } catch (err) {
            console.error('Save news error:', err);
            setSaveError(err.message || 'დაფიქსირდა შეცდომა');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;
        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                await supabase.from('news').delete().eq('id', itemToDelete.id);
                await recordAuditLog({
                    action: 'NEWS_DELETE',
                    tableName: 'news',
                    recordId: itemToDelete.id,
                    details: { title: itemToDelete.title_ka },
                });
            }
            setNewsList(prev => prev.filter(n => n.id !== itemToDelete.id));
            setItemToDelete(null);
        } catch (err) {
            console.error('Delete news error:', err);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Newspaper className="w-7 h-7 text-[#60318e]" />
                        სიახლეების მართვა
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        სამეცნიერო სიახლეების, სტატიებისა და განცხადებების გამოქვეყნება ({newsList.length})
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>ახალი სიახლის დამატება</span>
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                <div className="relative w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ძიება სათაურის მიხედვით..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                    />
                </div>
            </div>

            {/* News Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-4">სურათი</th>
                                <th className="py-3.5 px-4">სათაური</th>
                                <th className="py-3.5 px-4">თარიღი</th>
                                <th className="py-3.5 px-4 text-center">სტატუსი</th>
                                <th className="py-3.5 px-4 text-right">მოქმედება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება სიახლეები...
                                    </td>
                                </tr>
                            ) : filteredList.length > 0 ? (
                                filteredList.map((item) => (
                                    <tr key={item.id} className="hover:bg-purple-50/40 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="w-12 h-10 rounded-xl overflow-hidden bg-purple-50 border border-purple-100 flex items-center justify-center">
                                                {item.cover_image_url ? (
                                                    <img
                                                        src={item.cover_image_url}
                                                        alt={item.title_ka}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Newspaper className="w-5 h-5 text-[#AD49E1]/50" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 max-w-md">
                                            <div className="font-bold text-gray-900 line-clamp-1">
                                                {item.title_ka}
                                            </div>
                                            {item.title_en && (
                                                <div className="text-[11px] text-gray-400 line-clamp-1">
                                                    {item.title_en}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                                            {item.published_at ? new Date(item.published_at).toLocaleDateString('ka-GE') : '—'}
                                        </td>
                                        <td className="py-3 px-4 text-center whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                                item.status === 'published'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                            }`}>
                                                {item.status === 'published' ? 'გამოქვეყნებული' : 'დრაფტი'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => openEdit(item)}
                                                    className="p-1.5 rounded-lg bg-slate-100 text-[#60318e] hover:bg-[#60318e] hover:text-white transition-colors cursor-pointer"
                                                    title="რედაქტირება"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => setItemToDelete(item)}
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
                                    <td colSpan={5} className="py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Search className="w-8 h-8 text-gray-300 mb-1" />
                                            <p className="font-semibold text-xs">მითითებული პარამეტრით სიახლე ვერ მოიძებნა</p>
                                            {searchQuery && (
                                                <button
                                                    onClick={() => setSearchQuery('')}
                                                    className="mt-2 text-[11px] font-bold text-[#60318e] hover:text-[#7A1CAC] bg-purple-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-purple-200 inline-flex items-center gap-1"
                                                >
                                                    <span>ძებნის გასუფთავება</span>
                                                    <X className="w-3 h-3" />
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

            {/* Edit / Create News Modal via Portal AdminModal */}
            <AdminModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title={editingNews ? 'სიახლის რედაქტირება' : 'ახალი სიახლის დამატება'}
                subtitle="შეიყვანეთ ინფორმაცია და დააფორმატეთ ტექსტი TipTap ედითორით"
                icon={Newspaper}
                maxWidth="max-w-3xl"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm"
                        >
                            გაუქმება
                        </button>
                        <button
                            type="submit"
                            form="news-form"
                            disabled={isSaving}
                            className="bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
                        >
                            {isSaving ? 'ინახება...' : 'შენახვა'}
                        </button>
                    </>
                }
            >
                {saveError && (
                    <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="font-semibold">{saveError}</span>
                    </div>
                )}

                <form id="news-form" onSubmit={handleSave} className="space-y-5 text-xs sm:text-sm">
                            {/* Georgian Section */}
                            <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#60318e]"></span>
                                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700">
                                        ქართული ვერსია (სავალდებულო)
                                    </h4>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                        სათაური (ქართულად) *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.titleKa}
                                        onChange={(e) => setFormData(p => ({ ...p, titleKa: e.target.value }))}
                                        placeholder="მაგ: ახალი სამეცნიერო მიღწევა..."
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                        შინაარსი (ქართულად - TipTap Editor) *
                                    </label>
                                    <RichTextEditor
                                        value={formData.contentKa}
                                        onChange={(html) => setFormData(p => ({ ...p, contentKa: html }))}
                                        placeholder="დაწერეთ სიახლის სრული ტექსტი..."
                                    />
                                </div>
                            </div>

                            {/* English Section */}
                            <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#AD49E1]"></span>
                                    <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700">
                                        English Version (Optional)
                                    </h4>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                        Title (English)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.titleEn}
                                        onChange={(e) => setFormData(p => ({ ...p, titleEn: e.target.value }))}
                                        placeholder="e.g. New scientific achievement..."
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-xs"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                        Content (English - TipTap Editor)
                                    </label>
                                    <RichTextEditor
                                        value={formData.contentEn}
                                        onChange={(html) => setFormData(p => ({ ...p, contentEn: html }))}
                                        placeholder="Full news text in English..."
                                    />
                                </div>
                            </div>

                            {/* Media & Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                        მთავარი სურათი (Cover)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                                        className="w-full text-xs text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#60318e] file:text-white hover:file:bg-[#7A1CAC] cursor-pointer bg-white rounded-xl p-1 border border-gray-200"
                                    />
                                    {formData.coverImageUrl && !coverFile && (
                                        <span className="text-[11px] text-gray-500 block mt-1.5 truncate">
                                            მიმდინარე: {formData.coverImageUrl}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                        სტატუსი
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1] focus:border-transparent transition-all shadow-xs cursor-pointer"
                                    >
                                        <option value="published">გამოქვეყნებული (Published)</option>
                                        <option value="draft">დრაფტი (Draft)</option>
                                    </select>
                                </div>
                            </div>

                </form>
            </AdminModal>

            {/* Delete Modal via Portal AdminModal */}
            <AdminModal
                isOpen={Boolean(itemToDelete)}
                onClose={() => setItemToDelete(null)}
                title="სიახლის წაშლა"
                icon={Trash2}
                maxWidth="max-w-sm"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setItemToDelete(null)}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                        >
                            გაუქმება
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                        >
                            წაშლა
                        </button>
                    </>
                }
            >
                <div className="text-center py-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                        ნამდვილად გსურთ <strong>{itemToDelete?.title_ka}</strong>-ის წაშლა ბაზიდან?
                    </p>
                </div>
            </AdminModal>
        </div>
    );
}
