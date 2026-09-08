export const dynamic = 'force-static';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/admin/*',
                    '/api/',
                    '/api/*',
                    '/auth/',
                    '/auth/*',
                    '/logo-preview/',
                    '/logo-preview/*',
                ],
            },
        ],
        sitemap: 'https://iice.ge/sitemap.xml',
    };
}
