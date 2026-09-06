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
    Eye,
    Tag,
    FolderPlus,
    Check,
    Folder
} from 'lucide-react';

const INITIAL_CATEGORIES = [
    { id: 'cat-news', name_ka: 'სიახლეები', name_en: 'News', slug: 'news' },
    { id: 'cat-seminars', name_ka: 'სემინარები', name_en: 'Seminars', slug: 'seminars' },
    { id: 'cat-conferences', name_ka: 'კონფერენციები', name_en: 'Conferences', slug: 'conferences' },
    { id: 'cat-events', name_ka: 'ღონისძიებები', name_en: 'Events', slug: 'events' },
];

export default function AdminNewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [categories, setCategories] = useState(INITIAL_CATEGORIES);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

    // News Edit/Create Modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState({
        titleKa: '',
        titleEn: '',
        slug: '',
        categoryId: '',
        contentKa: '',
        contentEn: '',
        coverImageUrl: '',
        status: 'published',
    });
    const [coverFile, setCoverFile] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState('');
    const [itemToDelete, setItemToDelete] = useState(null);

    // Category Management Modal
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryData, setNewCategoryData] = useState({
        nameKa: '',
        nameEn: '',
        slug: '',
    });
    const [categoryError, setCategoryError] = useState('');
    const [isSavingCategory, setIsSavingCategory] = useState(false);

    // Load Data
    const loadNewsAndCategories = async () => {
        setIsLoading(true);
        try {
            const supabase = getSupabaseBrowserClient();
            if (!supabase) {
                setNewsList(staticNews.map(n => ({
                    id: String(n.id),
                    title_ka: n.title,
                    title_en: n.titleEn || n.title,
                    slug: n.slug || `news-${n.id}`,
                    category_id: n.category === 'seminars' ? 'cat-seminars' : 'cat-news',
                    content_ka: n.content,
                    content_en: n.contentEn,
                    cover_image_url: n.image,
                    status: 'published',
                    published_at: n.date,
                })));
                setCategories(INITIAL_CATEGORIES);
                setIsLoading(false);
                return;
            }

            // Fetch Categories & News in parallel
            const [catsRes, newsRes] = await Promise.all([
                supabase.from('news_categories').select('*').order('order_index', { ascending: true }),
                supabase.from('news').select('*, news_categories(id, name_ka, name_en, slug)').order('published_at', { ascending: false })
            ]);

            if (catsRes.data && catsRes.data.length > 0) {
                setCategories(catsRes.data);
            } else {
                setCategories(INITIAL_CATEGORIES);
            }

            if (newsRes.data && newsRes.data.length > 0) {
                setNewsList(newsRes.data);
            } else {
                setNewsList(staticNews.map(n => ({
                    id: String(n.id),
                    title_ka: n.title,
                    title_en: n.titleEn || n.title,
                    slug: n.slug || `news-${n.id}`,
                    category_id: n.category === 'seminars' ? 'cat-seminars' : 'cat-news',
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
        loadNewsAndCategories();
    }, []);

    // Filtered news
    const filteredList = useMemo(() => {
        return newsList.filter(n => {
            const fullTitle = `${n.title_ka || ''} ${n.title_en || ''}`.toLowerCase();
            const matchesSearch = fullTitle.includes(searchQuery.toLowerCase());

            const itemCatId = n.category_id || n.news_categories?.id;
            const matchesCategory = selectedCategoryFilter === 'ALL' || itemCatId === selectedCategoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [newsList, searchQuery, selectedCategoryFilter]);

    // Helpers
    const getCategoryName = (categoryId) => {
        const found = categories.find(c => c.id === categoryId);
        return found ? found.name_ka : 'სიახლეები';
    };

    const openCreate = () => {
        setEditingNews(null);
        setFormData({
            titleKa: '',
            titleEn: '',
            slug: '',
            categoryId: categories[0]?.id || '',
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
            categoryId: item.category_id || item.news_categories?.id || '',
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
                    category_id: formData.categoryId || null,
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
                        details: {
                            title: formData.titleKa,
                            category: getCategoryName(formData.categoryId),
                            status: formData.status
                        },
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
                        details: {
                            title: formData.titleKa,
                            category: getCategoryName(formData.categoryId),
                            status: formData.status
                        },
                    });
                }
            }

            // Refresh list
            await loadNewsAndCategories();
            setIsEditModalOpen(false);
        } catch (err) {
            console.error('Save news error:', err);
            setSaveError(err.message || 'შეცდომა სიახლის შენახვისას.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!itemToDelete) return;

        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                const { error } = await supabase
                    .from('news')
                    .delete()
                    .eq('id', itemToDelete.id);

                if (error) throw error;

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
            alert('შეცდომა წაშლისას: ' + err.message);
        }
    };

    // Category Creation
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setCategoryError('');

        if (!newCategoryData.nameKa.trim()) {
            setCategoryError('კატეგორიის ქართული სახელი სავალდებულოა');
            return;
        }

        setIsSavingCategory(true);
        try {
            const slug = newCategoryData.slug.trim() ||
                newCategoryData.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') ||
                `cat-${Date.now()}`;

            const catPayload = {
                name_ka: newCategoryData.nameKa.trim(),
                name_en: newCategoryData.nameEn.trim() || newCategoryData.nameKa.trim(),
                slug,
                order_index: categories.length + 1
            };

            const supabase = getSupabaseBrowserClient();
            let newCatId = `cat-${Date.now()}`;

            if (supabase) {
                const { data, error } = await supabase
                    .from('news_categories')
                    .insert([catPayload])
                    .select()
                    .single();

                if (!error && data) {
                    newCatId = data.id;
                    catPayload.id = data.id;
                }

                await recordAuditLog({
                    action: 'CATEGORY_CREATE',
                    tableName: 'news_categories',
                    recordId: newCatId,
                    details: catPayload
                });
            } else {
                catPayload.id = newCatId;
            }

            setCategories(prev => [...prev, catPayload]);
            setFormData(p => ({ ...p, categoryId: newCatId }));
            setNewCategoryData({ nameKa: '', nameEn: '', slug: '' });
            setIsCategoryModalOpen(false);
        } catch (err) {
            console.error('Create category error:', err);
            setCategoryError(err.message || 'შეცდომა კატეგორიის დამატებისას');
        } finally {
            setIsSavingCategory(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                        <Newspaper className="w-7 h-7 text-[#60318e]" />
                        სიახლეებისა და კატეგორიების მართვა
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        სამეცნიერო სიახლეები, სტატიები, კატეგორიები და გამოქვეყნების მართვა ({newsList.length} პოსტი)
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        type="button"
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-purple-50 text-[#60318e] border border-purple-200 font-bold px-3.5 py-2.5 rounded-2xl text-xs shadow-xs hover:border-purple-300 transition-all cursor-pointer"
                    >
                        <FolderPlus className="w-4 h-4" />
                        <span>კატეგორიები ({categories.length})</span>
                    </button>

                    <button
                        onClick={openCreate}
                        className="inline-flex items-center justify-center gap-2 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>ახალი სიახლის დამატება</span>
                    </button>
                </div>
            </div>

            {/* Category Filter Tabs & Search */}
            <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-xs space-y-3">
                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <button
                        onClick={() => setSelectedCategoryFilter('ALL')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                            selectedCategoryFilter === 'ALL'
                                ? 'bg-[#60318e] text-white shadow-xs'
                                : 'bg-slate-50 text-gray-600 hover:bg-purple-50 hover:text-gray-900 border border-slate-200'
                        }`}
                    >
                        ყველა კატეგორია ({newsList.length})
                    </button>

                    {categories.map((cat) => {
                        const isSelected = selectedCategoryFilter === cat.id;
                        const count = newsList.filter(n => (n.category_id || n.news_categories?.id) === cat.id).length;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategoryFilter(cat.id)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                                    isSelected
                                        ? 'bg-[#60318e] text-white shadow-xs'
                                        : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-gray-900 border border-gray-200'
                                }`}
                            >
                                <span>{cat.name_ka}</span>
                                {count > 0 && <span className="ml-1.5 text-[10px] opacity-75">({count})</span>}
                            </button>
                        );
                    })}
                </div>

                {/* Search Bar */}
                <div className="relative w-full">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ძიება სათაურის მიხედვით..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all"
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
                                <th className="py-3.5 px-4">კატეგორია</th>
                                <th className="py-3.5 px-4">თარიღი</th>
                                <th className="py-3.5 px-4 text-center">სტატუსი</th>
                                <th className="py-3.5 px-4 text-right">მოქმედება</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-14 text-center text-gray-400">
                                        <div className="w-6 h-6 border-2 border-[#60318e] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                        იტვირთება სიახლეები...
                                    </td>
                                </tr>
                            ) : filteredList.length > 0 ? (
                                filteredList.map((item) => {
                                    const catName = getCategoryName(item.category_id || item.news_categories?.id);
                                    return (
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

                                            <td className="py-3 px-4 whitespace-nowrap">
                                                <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#60318e] border border-purple-200 text-[11px] font-bold">
                                                    {catName}
                                                </span>
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
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-14 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Search className="w-8 h-8 text-gray-300 mb-1" />
                                            <p className="font-semibold text-xs">მითითებული პარამეტრებით სიახლე ვერ მოიძებნა</p>
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
                subtitle="შეიყვანეთ ინფორმაცია, აირჩიეთ კატეგორია და დააფორმატეთ ტექსტი TipTap ედითორით"
                icon={Newspaper}
                maxWidth="max-w-3xl"
                footer={
                    <div className="flex items-center justify-end gap-2 w-full">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-xs"
                        >
                            გაუქმება
                        </button>
                        <button
                            type="submit"
                            form="news-form"
                            disabled={isSaving}
                            className="bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 text-xs"
                        >
                            {isSaving ? 'ინახება...' : 'შენახვა'}
                        </button>
                    </div>
                }
            >
                {saveError && (
                    <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span className="font-semibold">{saveError}</span>
                    </div>
                )}

                <form id="news-form" onSubmit={handleSave} className="space-y-5 text-xs">
                    {/* Category Selection */}
                    <div className="bg-purple-50/60 p-3.5 rounded-2xl border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-800 mb-1 flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-[#60318e]" />
                                <span>სიახლის კატეგორია *</span>
                            </label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => setFormData(p => ({ ...p, categoryId: e.target.value }))}
                                className="w-full px-3 py-2 rounded-xl border border-purple-200 text-xs font-bold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                            >
                                <option value="">-- აირჩიეთ კატეგორია --</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name_ka} ({cat.name_en || cat.slug})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(true)}
                            className="text-xs font-bold text-[#60318e] hover:text-purple-900 bg-white border border-purple-200 px-3 py-2 rounded-xl hover:bg-purple-100/50 transition-colors flex items-center gap-1.5 self-end sm:self-auto cursor-pointer"
                        >
                            <FolderPlus className="w-3.5 h-3.5" />
                            <span>+ ახალი კატეგორია</span>
                        </button>
                    </div>

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
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all shadow-xs"
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
                                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-medium text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all shadow-xs"
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
                            <div className="flex items-center gap-3">
                                <label className="flex-1 border-2 border-dashed border-gray-300 hover:border-[#60318e] bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                                    <UploadCloud className="w-5 h-5 text-gray-400 group-hover:text-[#60318e] mb-1" />
                                    <span className="text-[11px] font-bold text-gray-600">
                                        {coverFile ? coverFile.name : 'სურათის არჩევა'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) setCoverFile(e.target.files[0]);
                                        }}
                                    />
                                </label>
                                {formData.coverImageUrl && !coverFile && (
                                    <img
                                        src={formData.coverImageUrl}
                                        alt="Preview"
                                        className="w-12 h-12 rounded-xl object-cover border border-purple-200"
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">
                                პუბლიკაციის სტატუსი
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                            >
                                <option value="published">გამოქვეყნებული (Published)</option>
                                <option value="draft">დრაფტი (Draft)</option>
                            </select>
                        </div>
                    </div>
                </form>
            </AdminModal>

            {/* Category Management Modal via Portal AdminModal */}
            <AdminModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                title="სიახლეების კატეგორიების მართვა"
                subtitle="დაამატეთ ახალი კატეგორია ან ნახეთ არსებულები"
                icon={FolderPlus}
                maxWidth="max-w-lg"
                footer={
                    <div className="flex items-center justify-end w-full">
                        <button
                            type="button"
                            onClick={() => setIsCategoryModalOpen(false)}
                            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-gray-700 transition-colors cursor-pointer"
                        >
                            დახურვა
                        </button>
                    </div>
                }
            >
                <div className="space-y-4 text-xs">
                    {categoryError && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{categoryError}</span>
                        </div>
                    )}

                    {/* New Category Form */}
                    <form onSubmit={handleCreateCategory} className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
                        <h4 className="font-bold text-purple-900 flex items-center gap-1.5">
                            <Plus className="w-4 h-4 text-[#60318e]" />
                            <span>ახალი კატეგორიის დამატება</span>
                        </h4>

                        <div>
                            <label className="block font-bold text-gray-700 mb-1">სახელი (ქართულად) *</label>
                            <input
                                type="text"
                                required
                                value={newCategoryData.nameKa}
                                onChange={(e) => setNewCategoryData(p => ({ ...p, nameKa: e.target.value }))}
                                placeholder="მაგ: გრანტები, პროექტები..."
                                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-gray-700 mb-1">Name (English)</label>
                            <input
                                type="text"
                                value={newCategoryData.nameEn}
                                onChange={(e) => setNewCategoryData(p => ({ ...p, nameEn: e.target.value }))}
                                placeholder="e.g. Grants, Projects..."
                                className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#AD49E1]"
                            />
                        </div>

                        <div className="flex justify-end pt-1">
                            <button
                                type="submit"
                                disabled={isSavingCategory}
                                className="px-4 py-2 rounded-xl bg-[#60318e] hover:bg-[#4a2470] text-white font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                <Check className="w-3.5 h-3.5" />
                                <span>{isSavingCategory ? 'ემატება...' : 'დამატება'}</span>
                            </button>
                        </div>
                    </form>

                    {/* Existing Categories List */}
                    <div>
                        <h4 className="font-bold text-gray-800 uppercase tracking-wider text-[11px] mb-2">
                            არსებული კატეგორიები ({categories.length})
                        </h4>
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="p-2.5 rounded-xl border border-gray-200 bg-white flex items-center justify-between"
                                >
                                    <div>
                                        <p className="font-bold text-gray-900">{cat.name_ka}</p>
                                        <p className="text-[10px] text-gray-400">{cat.name_en} • slug: {cat.slug}</p>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-[#60318e] font-mono text-[10px] font-bold">
                                        ID: {String(cat.id).slice(0, 8)}...
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AdminModal>

            {/* Delete Confirmation Modal */}
            <AdminModal
                isOpen={Boolean(itemToDelete)}
                onClose={() => setItemToDelete(null)}
                title="სიახლის წაშლა"
                icon={Trash2}
                maxWidth="max-w-md"
                footer={
                    <div className="flex items-center justify-end gap-2 w-full">
                        <button
                            onClick={() => setItemToDelete(null)}
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
                        დარწმუნებული ხართ, რომ გსურთ წაშალოთ სიახლე: <strong>"{itemToDelete.title_ka}"</strong>?
                        ეს მოქმედება შეუქცევადია.
                    </p>
                )}
            </AdminModal>
        </div>
    );
}
