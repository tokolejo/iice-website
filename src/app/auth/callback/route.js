import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/admin';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && user) {
      const isSuperAdmin = user.email?.toLowerCase() === 'tokolejo@gmail.com';
      const role = isSuperAdmin ? 'super_admin' : 'pending';

      // Upsert profile
      await supabase.from('user_profiles').upsert(
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email,
          role,
          is_active: true,
        },
        { onConflict: 'id' }
      );

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page or login with error instructions
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`);
}
