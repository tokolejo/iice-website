export const dynamic = 'force-static';
import { departmentsData } from '../data';
import { newsData } from '../data/newsData';

export default function sitemap() {
    const baseUrl = 'https://iice.ge';

    // Static routes
    const staticRoutes = [
        '',
        '/history',
        '/mission',
        '/structure',
        '/statute',
        '/scientific-council',
        '/reports',
        '/important-projects',
        '/administration',
        '/contact',
        '/collaboration',
        '/infrastructure',
        '/staff',
        '/departments',
        '/news',
        '/studies-internships',
        '/events/seminars',
        '/events/conference'
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/news' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Department Routes
    const departmentRoutes = departmentsData.map((dept) => ({
        url: `${baseUrl}/departments/${dept.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic News/Seminars Routes
    const dynamicNewsRoutes = newsData.map((item) => ({
        url: `${baseUrl}/news/${item.id}`,
        lastModified: new Date(item.date),
        changeFrequency: 'yearly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...departmentRoutes, ...dynamicNewsRoutes];
}
