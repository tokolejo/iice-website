export const dynamic = 'force-static';
import { departmentsData } from '../data';

export default function sitemap() {
    const baseUrl = 'https://iice.ge';

    // Static public routes with appropriate changeFrequency and priority
    const staticRoutes = [
        { route: '/', changeFrequency: 'daily', priority: 1.0 },
        { route: '/news/', changeFrequency: 'daily', priority: 0.9 },
        { route: '/conference-2026/', changeFrequency: 'weekly', priority: 0.9 },
        { route: '/departments/', changeFrequency: 'weekly', priority: 0.85 },
        { route: '/staff/', changeFrequency: 'monthly', priority: 0.8 },
        { route: '/important-projects/', changeFrequency: 'monthly', priority: 0.8 },
        { route: '/infrastructure/', changeFrequency: 'monthly', priority: 0.75 },
        { route: '/collaboration/', changeFrequency: 'monthly', priority: 0.75 },
        { route: '/studies-internships/', changeFrequency: 'monthly', priority: 0.75 },
        { route: '/contact/', changeFrequency: 'monthly', priority: 0.75 },
        { route: '/history/', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/mission/', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/statute/', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/scientific-council/', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/administration/', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/reports/', changeFrequency: 'monthly', priority: 0.7 },
        { route: '/events/conference-2023/', changeFrequency: 'yearly', priority: 0.6 },
        { route: '/events/conference-2016/', changeFrequency: 'yearly', priority: 0.5 }
    ].map((item) => ({
        url: `${baseUrl}${item.route}`,
        lastModified: new Date(),
        changeFrequency: item.changeFrequency,
        priority: item.priority,
    }));

    // Department individual routes
    const departmentRoutes = departmentsData.map((dept) => ({
        url: `${baseUrl}/departments/${dept.id}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    return [...staticRoutes, ...departmentRoutes];
}
