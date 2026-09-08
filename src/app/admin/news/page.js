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
    Folder,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    Filter,
    Images,
    Star,
    ChevronLeft,
    ChevronRight
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
    const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

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
    const [coverPreviewUrl, setCoverPreviewUrl] = useState('');
    const [galleryItems, setGalleryItems] = useState([]);
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
    const [deletingCatId, setDeletingCatId] = useState(null);

    // Sync Cover Preview URL
    useEffect(() => {
        if (coverFile) {
            const url = URL.createObjectURL(coverFile);
            setCoverPreviewUrl(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        } else {
            setCoverPreviewUrl(formData.coverImageUrl || '');
        }
    }, [coverFile, formData.coverImageUrl]);

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
                    cover_image_url: n.imageUrl || n.image || '',
                    gallery_urls: Array.isArray(n.images) && n.images.length > 0 ? n.images : (n.imageUrl ? [n.imageUrl] : []),
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
                    cover_image_url: n.imageUrl || n.image || '',
                    gallery_urls: Array.isArray(n.images) && n.images.length > 0 ? n.images : (n.imageUrl ? [n.imageUrl] : []),
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

    // Helpers
    const getCategoryName = (categoryId) => {
        const found = categories.find(c => c.id === categoryId);
        return found ? found.name_ka : 'სიახლეები';
    };

    // Toggle Sort
    const handleSort = (key) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            }
            return { key, direction: 'asc' };
        });
    };

    // Filtered & Sorted news
    const filteredList = useMemo(() => {
        const result = newsList.filter(n => {
            const fullTitle = `${n.title_ka || ''} ${n.title_en || ''}`.toLowerCase();
            const matchesSearch = fullTitle.includes(searchQuery.toLowerCase());

            const itemCatId = n.category_id || n.news_categories?.id;
            const matchesCategory = selectedCategoryFilter === 'ALL' || itemCatId === selectedCategoryFilter;

            const matchesStatus = selectedStatusFilter === 'ALL' || n.status === selectedStatusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });

        // Sorting
        result.sort((a, b) => {
            let comparison = 0;
            if (sortConfig.key === 'title') {
                const titleA = (a.title_ka || '').trim();
                const titleB = (b.title_ka || '').trim();
                comparison = titleA.localeCompare(titleB, 'ka');
            } else if (sortConfig.key === 'category') {
                const catA = getCategoryName(a.category_id || a.news_categories?.id);
                const catB = getCategoryName(b.category_id || b.news_categories?.id);
                comparison = catA.localeCompare(catB, 'ka');
            } else if (sortConfig.key === 'date') {
                const dateA = new Date(a.published_at || a.created_at || 0).getTime();
                const dateB = new Date(b.published_at || b.created_at || 0).getTime();
                comparison = dateA - dateB;
            } else if (sortConfig.key === 'status') {
                const statusA = a.status || '';
                const statusB = b.status || '';
                comparison = statusA.localeCompare(statusB);
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });

        return result;
    }, [newsList, searchQuery, selectedCategoryFilter, selectedStatusFilter, sortConfig, categories]);

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
        setGalleryItems([]);
        setSaveError('');
        setIsEditModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingNews(item);
        const cover = item.cover_image_url || item.imageUrl || '';

        let existingGallery = [];
        if (Array.isArray(item.gallery_urls) && item.gallery_urls.length > 0) {
            existingGallery = item.gallery_urls;
        } else if (Array.isArray(item.images) && item.images.length > 0) {
            existingGallery = item.images;
        }

        setFormData({
            titleKa: item.title_ka || item.title || '',
            titleEn: item.title_en || item.titleEn || '',
            slug: item.slug || '',
            categoryId: item.category_id || item.news_categories?.id || (item.category === 'seminars' ? 'cat-seminars' : 'cat-news'),
            contentKa: item.content_ka || item.content || '',
            contentEn: item.content_en || item.contentEn || '',
            coverImageUrl: cover,
            status: item.status || 'published',
        });
        setCoverFile(null);
        setGalleryItems(
            existingGallery.map((url, idx) => ({
                id: `existing-${idx}-${url}`,
                url,
                isExisting: true,
            }))
        );
        setSaveError('');
        setIsEditModalOpen(true);
    };

    // Gallery & Media Handlers
    const handleGalleryFilesSelected = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newItems = files.map((file, idx) => ({
            id: `new-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
            url: URL.createObjectURL(file),
            file,
            isExisting: false,
        }));

        setGalleryItems(prev => {
            const updated = [...prev, ...newItems];
            if (!coverFile && !formData.coverImageUrl && updated.length > 0) {
                if (updated[0].file) {
                    setCoverFile(updated[0].file);
                } else if (updated[0].url) {
                    setFormData(p => ({ ...p, coverImageUrl: updated[0].url }));
                }
            }
            return updated;
        });

        e.target.value = '';
    };

    const handleSetAsCover = (item) => {
        if (item.file) {
            setCoverFile(item.file);
            setFormData(p => ({ ...p, coverImageUrl: '' }));
        } else if (item.url) {
            setCoverFile(null);
            setFormData(p => ({ ...p, coverImageUrl: item.url }));
        }
    };

    const handleRemoveCover = () => {
        setCoverFile(null);
        setFormData(p => ({ ...p, coverImageUrl: '' }));
    };

    const handleRemoveGalleryItem = (id) => {
        setGalleryItems(prev => {
            const itemToRemove = prev.find(i => i.id === id);
            if (itemToRemove && !itemToRemove.isExisting && itemToRemove.url?.startsWith('blob:')) {
                URL.revokeObjectURL(itemToRemove.url);
            }
            return prev.filter(i => i.id !== id);
        });
    };

    const handleMoveGalleryItem = (index, direction) => {
        setGalleryItems(prev => {
            const targetIndex = index + direction;
            if (targetIndex < 0 || targetIndex >= prev.length) return prev;
            const copy = [...prev];
            const temp = copy[index];
            copy[index] = copy[targetIndex];
            copy[targetIndex] = temp;
            return copy;
        });
    };

    const handleClearGallery = () => {
        galleryItems.forEach(item => {
            if (!item.isExisting && item.url?.startsWith('blob:')) {
                URL.revokeObjectURL(item.url);
            }
        });
        setGalleryItems([]);
    };

    const uploadFileToStorage = async (supabase, file, prefix = 'news') => {
        const ext = file.name.split('.').pop() || 'jpg';
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanName}`;
        const { error: uploadError } = await supabase.storage
            .from('news-media')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Storage upload error:', uploadError);
            throw new Error(`სურათის ატვირთვის შეცდომა (${file.name}): ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
            .from('news-media')
            .getPublicUrl(filePath);

        return publicUrl;
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
                // 1. Upload Cover if newly chosen
                if (coverFile) {
                    finalCoverUrl = await uploadFileToStorage(supabase, coverFile, 'cover');
                }

                // 2. Upload and preserve gallery order
                const finalGalleryUrls = [];
                for (const item of galleryItems) {
                    if (item.isExisting && item.url) {
                        finalGalleryUrls.push(item.url);
                    } else if (item.file) {
                        if (coverFile && item.file === coverFile && finalCoverUrl) {
                            finalGalleryUrls.push(finalCoverUrl);
                        } else {
                            const uploadedUrl = await uploadFileToStorage(supabase, item.file, 'gallery');
                            finalGalleryUrls.push(uploadedUrl);
                        }
                    }
                }

                // Auto-fill cover from gallery if missing
                if (!finalCoverUrl && finalGalleryUrls.length > 0) {
                    finalCoverUrl = finalGalleryUrls[0];
                }

                // If cover exists but gallery is empty, include cover as sole gallery slide
                if (finalCoverUrl && finalGalleryUrls.length === 0) {
                    finalGalleryUrls.push(finalCoverUrl);
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
                    gallery_urls: finalGalleryUrls,
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
                            status: formData.status,
                            gallery_count: finalGalleryUrls.length,
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
                            status: formData.status,
                            gallery_count: finalGalleryUrls.length,
                        },
                    });
                }
            } else {
                // Local fallback mode
                const finalGalleryUrls = galleryItems.map(i => i.url).filter(Boolean);
                if (!finalCoverUrl && finalGalleryUrls.length > 0) finalCoverUrl = finalGalleryUrls[0];
                if (finalCoverUrl && finalGalleryUrls.length === 0) finalGalleryUrls.push(finalCoverUrl);

                const fallbackItem = {
                    id: editingNews ? editingNews.id : `news-${Date.now()}`,
                    title_ka: formData.titleKa,
                    title_en: formData.titleEn || null,
                    slug: formData.slug || `news-${Date.now()}`,
                    category_id: formData.categoryId || 'cat-news',
                    content_ka: formData.contentKa,
                    content_en: formData.contentEn || null,
                    cover_image_url: finalCoverUrl || null,
                    gallery_urls: finalGalleryUrls,
                    status: formData.status,
                    published_at: editingNews?.published_at || new Date().toISOString(),
                };

                if (editingNews) {
                    setNewsList(prev => prev.map(n => n.id === editingNews.id ? { ...n, ...fallbackItem } : n));
                } else {
                    setNewsList(prev => [fallbackItem, ...prev]);
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

    // Category Deletion (Full permissions for super_admin / admin)
    const handleDeleteCategory = async (cat) => {
        if (!cat) return;

        const count = newsList.filter(n => (n.category_id || n.news_categories?.id) === cat.id).length;
        const confirmMessage = count > 0
            ? `კატეგორიაში „${cat.name_ka}“ არის ${count} სიახლე. წაშლის შემთხვევაში ამ სიახლეებს კატეგორია მოეხსნებათ. ნამდვილად გსურთ წაშლა?`
            : `ნამდვილად გსურთ წაშალოთ კატეგორია „${cat.name_ka}“?`;

        if (!window.confirm(confirmMessage)) return;

        setDeletingCatId(cat.id);
        try {
            const supabase = getSupabaseBrowserClient();
            if (supabase) {
                const { error } = await supabase
                    .from('news_categories')
                    .delete()
                    .eq('id', cat.id);

                if (error) throw error;

                await recordAuditLog({
                    action: 'CATEGORY_DELETE',
                    tableName: 'news_categories',
                    recordId: String(cat.id),
                    details: { name_ka: cat.name_ka, name_en: cat.name_en, slug: cat.slug }
                });
            }

            setCategories(prev => prev.filter(c => c.id !== cat.id));

            if (selectedCategoryFilter === cat.id) {
                setSelectedCategoryFilter('ALL');
            }

            await loadNewsAndCategories();
        } catch (err) {
            console.error('Delete category error:', err);
            alert(`კატეგორიის წაშლის შეცდომა: ${err.message}`);
        } finally {
            setDeletingCatId(null);
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

                {/* Search Bar & Status Filter */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ძიება სათაურის მიხედვით..."
                            className="w-full pl-10 pr-9 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#AD49E1] transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                                title="გასუფთავება"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto flex-shrink-0">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-slate-50 text-xs font-bold text-gray-700">
                            <Filter className="w-3.5 h-3.5 text-[#60318e]" />
                            <span>სტატუსი:</span>
                            <select
                                value={selectedStatusFilter}
                                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                                className="bg-transparent font-bold text-[#60318e] focus:outline-none cursor-pointer pl-1"
                            >
                                <option value="ALL">ყველა</option>
                                <option value="published">გამოქვეყნებული</option>
                                <option value="draft">დრაფტი</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* News Table */}
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-gray-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                            <tr>
                                <th className="py-3.5 px-4 w-16">სურათი</th>
                                <th
                                    onClick={() => handleSort('title')}
                                    className="py-3.5 px-4 cursor-pointer hover:bg-purple-100/50 transition-colors select-none group"
                                    title="სათაურით სორტირება"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <span className={sortConfig.key === 'title' ? 'text-[#60318e] font-black' : ''}>სათაური</span>
                                        {sortConfig.key === 'title' ? (
                                            sortConfig.direction === 'asc' ? (
                                                <ArrowUp className="w-3.5 h-3.5 text-[#60318e]" />
                                            ) : (
                                                <ArrowDown className="w-3.5 h-3.5 text-[#60318e]" />
                                            )
                                        ) : (
                                            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        )}
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort('category')}
                                    className="py-3.5 px-4 cursor-pointer hover:bg-purple-100/50 transition-colors select-none group"
                                    title="კატეგორიით სორტირება"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <span className={sortConfig.key === 'category' ? 'text-[#60318e] font-black' : ''}>კატეგორია</span>
                                        {sortConfig.key === 'category' ? (
                                            sortConfig.direction === 'asc' ? (
                                                <ArrowUp className="w-3.5 h-3.5 text-[#60318e]" />
                                            ) : (
                                                <ArrowDown className="w-3.5 h-3.5 text-[#60318e]" />
                                            )
                                        ) : (
                                            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        )}
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort('date')}
                                    className="py-3.5 px-4 cursor-pointer hover:bg-purple-100/50 transition-colors select-none group"
                                    title="თარიღით სორტირება"
                                >
                                    <div className="flex items-center gap-1.5">
                                        <span className={sortConfig.key === 'date' ? 'text-[#60318e] font-black' : ''}>თარიღი</span>
                                        {sortConfig.key === 'date' ? (
                                            sortConfig.direction === 'asc' ? (
                                                <ArrowUp className="w-3.5 h-3.5 text-[#60318e]" />
                                            ) : (
                                                <ArrowDown className="w-3.5 h-3.5 text-[#60318e]" />
                                            )
                                        ) : (
                                            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        )}
                                    </div>
                                </th>
                                <th
                                    onClick={() => handleSort('status')}
                                    className="py-3.5 px-4 text-center cursor-pointer hover:bg-purple-100/50 transition-colors select-none group"
                                    title="სტატუსით სორტირება"
                                >
                                    <div className="flex items-center justify-center gap-1.5">
                                        <span className={sortConfig.key === 'status' ? 'text-[#60318e] font-black' : ''}>სტატუსი</span>
                                        {sortConfig.key === 'status' ? (
                                            sortConfig.direction === 'asc' ? (
                                                <ArrowUp className="w-3.5 h-3.5 text-[#60318e]" />
                                            ) : (
                                                <ArrowDown className="w-3.5 h-3.5 text-[#60318e]" />
                                            )
                                        ) : (
                                            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                        )}
                                    </div>
                                </th>
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
                                                <div className="relative w-12 h-10 rounded-xl overflow-hidden bg-purple-50 border border-purple-100 flex items-center justify-center">
                                                    {item.cover_image_url ? (
                                                        <img
                                                            src={item.cover_image_url}
                                                            alt={item.title_ka}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <Newspaper className="w-5 h-5 text-[#AD49E1]/50" />
                                                    )}
                                                    {Array.isArray(item.gallery_urls) && item.gallery_urls.length > 1 && (
                                                        <div className="absolute bottom-0 right-0 bg-slate-900/85 backdrop-blur-xs text-[8px] font-black text-white px-1 py-0.5 rounded-tl flex items-center gap-0.5">
                                                            <Images className="w-2.5 h-2.5" />
                                                            <span>{item.gallery_urls.length}</span>
                                                        </div>
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
                                            {(searchQuery || selectedCategoryFilter !== 'ALL' || selectedStatusFilter !== 'ALL') && (
                                                <button
                                                    onClick={() => {
                                                        setSearchQuery('');
                                                        setSelectedCategoryFilter('ALL');
                                                        setSelectedStatusFilter('ALL');
                                                    }}
                                                    className="mt-2 text-[11px] font-bold text-[#60318e] hover:text-[#7A1CAC] bg-purple-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer border border-purple-200 inline-flex items-center gap-1"
                                                >
                                                    <span>ფილტრების გასუფთავება</span>
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
                maxWidth="max-w-4xl"
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

                    {/* Media: Cover & Gallery */}
                    <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-5">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#60318e]"></span>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-2">
                                    <Images className="w-4 h-4 text-[#60318e]" />
                                    <span>სურათები და მედია</span>
                                </h4>
                            </div>
                            <span className="text-[11px] text-gray-500 font-medium">
                                ქავერი + გალერეის სლაიდერი
                            </span>
                        </div>

                        {/* Cover Image Section */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-gray-700">
                                    მთავარი სურათი (Cover Image)
                                </label>
                                {coverPreviewUrl && (
                                    <button
                                        type="button"
                                        onClick={handleRemoveCover}
                                        className="text-[11px] text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        <span>ქავერის მოხსნა</span>
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                {/* Preview Box */}
                                <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-2xl overflow-hidden bg-purple-50 border-2 border-purple-200 shadow-sm flex items-center justify-center flex-shrink-0 group">
                                    {coverPreviewUrl ? (
                                        <>
                                            <img
                                                src={coverPreviewUrl}
                                                alt="Cover Preview"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-amber-300" />
                                                <span>ქავერი</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-2 text-gray-400">
                                            <UploadCloud className="w-6 h-6 mx-auto mb-1 text-purple-300" />
                                            <span className="text-[10px] font-bold block">არ არის არჩეული</span>
                                        </div>
                                    )}
                                </div>

                                {/* Upload / Select Controls */}
                                <div className="flex-1 space-y-2 w-full">
                                    <div className="flex items-center gap-2">
                                        <label className="flex-1 border-2 border-dashed border-gray-300 hover:border-[#60318e] bg-white rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors group">
                                            <UploadCloud className="w-4 h-4 text-gray-400 group-hover:text-[#60318e]" />
                                            <span className="text-[11px] font-bold text-gray-700">
                                                {coverFile ? coverFile.name : 'ახალი ქავერის არჩევა'}
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        setCoverFile(e.target.files[0]);
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-[11px] text-gray-500 font-medium">
                                        მთავარი სურათი ჩანს საიტის ბარათებზე. ასევე შეგიძლიათ ქვემოთ მოცემული გალერეიდან ნებისმიერ სურათზე დააწკაპუნოთ „ქავერად დაყენებას“.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="pt-3 border-t border-slate-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 flex items-center gap-1.5">
                                        <Images className="w-3.5 h-3.5 text-[#60318e]" />
                                        <span>გალერეის სურათები (სლაიდერი)</span>
                                        <span className="ml-1 text-[11px] font-normal text-gray-500">
                                            ({galleryItems.length} სურათი)
                                        </span>
                                    </label>
                                    <p className="text-[11px] text-gray-500 font-medium">
                                        ატვირთეთ რამდენიმე სურათი ერთდროულად. ვიზიტორები ამ სურათებს გადასქროლავენ გალერეაში.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {galleryItems.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleClearGallery}
                                            className="text-[11px] text-gray-500 hover:text-red-600 font-bold px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            გასუფთავება
                                        </button>
                                    )}
                                    <label className="inline-flex items-center gap-1.5 bg-[#60318e] hover:bg-[#7A1CAC] text-white font-bold px-3.5 py-1.5 rounded-xl text-xs shadow-xs hover:shadow transition-all cursor-pointer">
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>+ სურათების დამატება</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleGalleryFilesSelected}
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Gallery Empty / Multi-upload Dropzone */}
                            {galleryItems.length === 0 ? (
                                <label className="border-2 border-dashed border-purple-200 hover:border-[#60318e] bg-purple-50/40 hover:bg-purple-50/70 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group text-center">
                                    <Images className="w-8 h-8 text-purple-400 group-hover:text-[#60318e] mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold text-gray-800 mb-1">
                                        დააწკაპუნეთ აქ რამდენიმე სურათის ერთად ასარჩევად
                                    </span>
                                    <span className="text-[11px] text-gray-500 font-medium">
                                        შეგიძლიათ ერთდროულად მონიშნოთ და ატვირთოთ 1-ზე მეტი ფოტო (JPG, PNG, WebP)
                                    </span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleGalleryFilesSelected}
                                    />
                                </label>
                            ) : (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2 rounded-2xl bg-white border border-gray-200">
                                        {galleryItems.map((item, index) => {
                                            const isCurrentCover = (coverFile && item.file === coverFile) ||
                                                (!coverFile && formData.coverImageUrl && item.url === formData.coverImageUrl);
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={`group relative rounded-xl overflow-hidden border-2 transition-all bg-slate-950 aspect-[4/3] flex items-center justify-center ${
                                                        isCurrentCover
                                                            ? 'border-amber-400 shadow-md ring-2 ring-amber-400/20'
                                                            : 'border-slate-200 hover:border-purple-300'
                                                    }`}
                                                >
                                                    <img
                                                        src={item.url}
                                                        alt={`Gallery ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {/* Index Badge */}
                                                    <div className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-black px-1.5 py-0.5 rounded-md">
                                                        #{index + 1}
                                                    </div>

                                                    {/* Cover Star Badge */}
                                                    {isCurrentCover && (
                                                        <div className="absolute top-1.5 right-1.5 bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                                            <Star className="w-2.5 h-2.5 fill-slate-900" />
                                                            <span>ქავერი</span>
                                                        </div>
                                                    )}

                                                    {/* Hover Overlay with Actions */}
                                                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                                        <div className="flex items-center justify-between">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSetAsCover(item)}
                                                                className={`text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
                                                                    isCurrentCover
                                                                        ? 'bg-amber-400 text-slate-900'
                                                                        : 'bg-white/20 hover:bg-amber-400 hover:text-slate-900 text-white'
                                                                }`}
                                                                title="დააყენეთ ეს სურათი მთავარ ქავერად"
                                                            >
                                                                <Star className="w-3 h-3" />
                                                                <span>{isCurrentCover ? 'ქავერია' : 'ქავერად'}</span>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveGalleryItem(item.id)}
                                                                className="p-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                                                                title="სურათის წაშლა გალერეიდან"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>

                                                        {/* Reordering Controls */}
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                type="button"
                                                                disabled={index === 0}
                                                                onClick={() => handleMoveGalleryItem(index, -1)}
                                                                className="p-1 rounded-md bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white transition-all cursor-pointer"
                                                                title="მარცხნივ გადაადგილება"
                                                            >
                                                                <ChevronLeft className="w-4 h-4" />
                                                            </button>
                                                            <span className="text-[10px] text-white/80 font-bold">
                                                                {index + 1} / {galleryItems.length}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                disabled={index === galleryItems.length - 1}
                                                                onClick={() => handleMoveGalleryItem(index, 1)}
                                                                className="p-1 rounded-md bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white transition-all cursor-pointer"
                                                                title="მარჯვნივ გადაადგილება"
                                                            >
                                                                <ChevronRight className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] text-gray-500 px-1">
                                        <span>* ისრებით შეგიძლიათ შეცვალოთ სურათების ჩვენების თანმიმდევრობა</span>
                                        <label className="text-[#60318e] hover:text-[#7A1CAC] font-bold cursor-pointer flex items-center gap-1">
                                            <Plus className="w-3 h-3" />
                                            <span>კიდევ დამატება</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleGalleryFilesSelected}
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div className="pt-3 border-t border-slate-200">
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
                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                            {categories.map((cat) => {
                                const count = newsList.filter(n => (n.category_id || n.news_categories?.id) === cat.id).length;
                                return (
                                    <div
                                        key={cat.id}
                                        className="p-2.5 rounded-xl border border-gray-200 bg-white hover:border-purple-200 transition-colors flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#60318e] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                                                <Folder className="w-4 h-4" />
                                            </div>
                                            <div className="truncate">
                                                <p className="font-bold text-gray-900 text-xs truncate flex items-center gap-1.5">
                                                    <span>{cat.name_ka}</span>
                                                    <span className="text-[10px] text-gray-400 font-normal">({cat.name_en})</span>
                                                </p>
                                                <p className="text-[10px] text-gray-400">
                                                    {count} პოსტი • slug: {cat.slug}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteCategory(cat)}
                                                disabled={deletingCatId === cat.id}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                title="კატეგორიის წაშლა"
                                            >
                                                {deletingCatId === cat.id ? (
                                                    <div className="w-3.5 h-3.5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
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
