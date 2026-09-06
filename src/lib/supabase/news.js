import { newsData as staticNews } from '../../data/newsData';
import { getSupabaseBrowserClient } from './client';

export function mapNewsRowToModel(row) {
    const categorySlug = row.news_categories?.slug || (row.category_id ? 'news' : 'news');
    const category = categorySlug === 'seminars' ? 'seminars' : 'news';
    const dateStr = row.published_at ? row.published_at.substring(0, 10) : new Date().toISOString().substring(0, 10);

    const plainDescKa = (row.content_ka || '').replace(/<[^>]*>?/gm, '').substring(0, 200) + '...';
    const plainDescEn = (row.content_en || row.content_ka || '').replace(/<[^>]*>?/gm, '').substring(0, 200) + '...';

    return {
        id: row.id,
        category,
        date: dateStr,
        title: row.title_ka,
        titleEn: row.title_en || row.title_ka,
        description: plainDescKa,
        descriptionEn: plainDescEn,
        content: row.content_ka,
        contentEn: row.content_en || row.content_ka,
        imageUrl: row.cover_image_url || '/images/news-placeholder.jpg',
        images: Array.isArray(row.gallery_urls) && row.gallery_urls.length > 0
            ? row.gallery_urls
            : (row.cover_image_url ? [row.cover_image_url] : ['/images/news-placeholder.jpg']),
        slug: row.slug,
        files: row.attached_files || [],
    };
}

export async function getDynamicNews() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
        return staticNews;
    }

    try {
        const { data, error } = await supabase
            .from('news')
            .select('*, news_categories (*)')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (error || !data || data.length === 0) {
            return staticNews;
        }

        // თუ Supabase-ში სიახლეები არის, მხოლოდ ისინი დაბრუნდეს (სტატიკური ამოვარდება)
        return data.map(mapNewsRowToModel);
    } catch (err) {
        console.warn('Error fetching dynamic news, using static data:', err);
        return staticNews;
    }
}
