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
  const cleanPathname = pathname.replace(/\/+$/, '') || '/';

  // Only handle admin routes or auth callback for auth checks
  const isAdminRoute = cleanPathname.startsWith('/admin');
  const isLoginPage = cleanPathname === '/admin/login';
  const isPendingPage = cleanPathname === '/admin/pending';

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
        const loginUrl = new URL('/admin/login/', request.url);
        loginUrl.searchParams.set('next', pathname);
        return NextResponse.redirect(loginUrl);
      }
      return response;
    }

    // 2. User is logged in
    const isSuperAdminEmail = user.email?.toLowerCase() === 'tokolejo@gmail.com';

    // If on login page and already authenticated
    if (isLoginPage) {
      return NextResponse.redirect(new URL('/admin/', request.url));
    }

    // Check user profile and roles
    let roles = isSuperAdminEmail ? ['super_admin'] : [];
    let isActive = true;

    if (!isSuperAdminEmail) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role, roles, is_active')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        if (Array.isArray(profile.roles) && profile.roles.length > 0) {
          roles = profile.roles;
        } else if (profile.role) {
          roles = [profile.role];
        }
        if (profile.is_active === false) {
          isActive = false;
        }
      }
    }

    const hasSuperAdmin = roles.includes('super_admin');
    const hasAdmin = roles.includes('admin') || hasSuperAdmin;
    const hasEditor = roles.includes('editor') || hasAdmin;
    const hasDeptHead = roles.includes('department_head') || hasAdmin;
    const hasConfManager = roles.includes('conference_manager') || hasAdmin;

    const isApproved =
      isActive &&
      (hasSuperAdmin ||
        hasAdmin ||
        roles.some((r) =>
          ['editor', 'department_head', 'conference_manager'].includes(r)
        ));

    // Pending approval or inactive
    if (!isApproved) {
      if (!isPendingPage) {
        return NextResponse.redirect(new URL('/admin/pending/', request.url));
      }
      return response;
    }

    // If approved user tries to access /admin/pending, redirect to /admin/
    if (isPendingPage) {
      return NextResponse.redirect(new URL('/admin/', request.url));
    }

    // Route-level granular RBAC enforcement:
    // 1. /admin/users: Super Admin only
    if (cleanPathname.startsWith('/admin/users') && !hasSuperAdmin) {
      return NextResponse.redirect(new URL('/admin/', request.url));
    }

    // 2. /admin/news: Super Admin, Admin, or News Editor
    if (cleanPathname.startsWith('/admin/news') && !hasEditor) {
      return NextResponse.redirect(new URL('/admin/', request.url));
    }

    // 3. /admin/staff: Super Admin, Admin, or Department Head
    if (cleanPathname.startsWith('/admin/staff') && !hasDeptHead) {
      return NextResponse.redirect(new URL('/admin/', request.url));
    }

    // 4. /admin/conference: Super Admin, Admin, or Conference Manager
    if (cleanPathname.startsWith('/admin/conference') && !hasConfManager) {
      return NextResponse.redirect(new URL('/admin/', request.url));
    }

    // 5. /admin/departments and /admin/audit: Super Admin or Admin
    if (
      (cleanPathname.startsWith('/admin/departments') ||
        cleanPathname.startsWith('/admin/audit')) &&
      !hasAdmin
    ) {
      return NextResponse.redirect(new URL('/admin/', request.url));
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
