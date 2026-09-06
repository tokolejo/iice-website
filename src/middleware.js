import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const pathname = request.nextUrl.pathname;

  // Only handle admin routes or auth callback for auth checks
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  const isPendingPage = pathname === '/admin/pending';

  // If Supabase is not yet configured, allow viewing for local testing
  if (!url || !anonKey) {
    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh auth session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminRoute) {
    // 1. Not logged in
    if (!user) {
      if (!isLoginPage) {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('next', pathname);
        return NextResponse.redirect(loginUrl);
      }
      return response;
    }

    // 2. User is logged in
    const isSuperAdminEmail = user.email?.toLowerCase() === 'tokolejo@gmail.com';

    // If on login page and already authenticated
    if (isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Check user profile and role
    let role = isSuperAdminEmail ? 'super_admin' : 'pending';

    if (!isSuperAdminEmail) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role, is_active')
        .eq('id', user.id)
        .single();

      if (profile) {
        role = profile.role || 'pending';
        if (profile.is_active === false) {
          role = 'inactive';
        }
      }
    }

    // Pending approval
    if (role === 'pending' || role === 'inactive') {
      if (!isPendingPage) {
        return NextResponse.redirect(new URL('/admin/pending', request.url));
      }
      return response;
    }

    // If user is approved (admin or super_admin) and trying to access /admin/pending, redirect to /admin
    if (isPendingPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Protect super_admin only routes (e.g. /admin/users)
    if (pathname.startsWith('/admin/users') && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/callback',
  ],
};
