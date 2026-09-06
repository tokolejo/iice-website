import { departmentsData, staffData } from '../../data';
import { getSupabaseBrowserClient } from './client';

export function mapStaffRowToModel(row, deptMap = {}) {
  const dept = row.departments || deptMap[row.department_id] || {};
  const deptSlug = dept.slug || 'general';
  const deptNameKa = dept.name_ka || '';
  const deptNameEn = dept.name_en || '';

  const links = [];
  if (row.google_scholar_url) {
    links.push({ title: 'Google Scholar', url: row.google_scholar_url });
  }
  if (row.scopus_url) {
    links.push({ title: 'Scopus', url: row.scopus_url });
  }
  if (row.web_of_science_url) {
    links.push({ title: 'Web of Science', url: row.web_of_science_url });
  }
  if (row.orcid_url) {
    links.push({ title: 'ORCID', url: row.orcid_url });
  }

  const emails = row.email ? [row.email] : [];

  return {
    id: row.id,
    name: `${row.first_name_ka || ''} ${row.last_name_ka || ''}`.trim(),
    nameEn: row.first_name_en && row.last_name_en ? `${row.first_name_en} ${row.last_name_en}`.trim() : (row.first_name_ka || ''),
    role: row.position_ka || '',
    roleEn: row.position_en || row.position_ka || '',
    department: deptNameKa,
    departmentEn: deptNameEn,
    departmentId: deptSlug,
    imageUrl: row.photo_url || '',
    bioLink: row.bio_ka || '',
    bioLinkEn: row.bio_en || '',
    cvLink: row.cv_file_url || '',
    cvLinkEn: row.cv_file_url || '',
    emails,
    phone: row.phone || '',
    links,
    isHead: row.id === dept.head_staff_id || row.position_ka?.toLowerCase().includes('ხელმძღვანელი'),
    isManagement: !!row.is_management,
    isCouncilMember: !!row.is_council_member,
    orderIndex: row.order_index ?? 0,
    scientificDegreeKa: row.scientific_degree_ka || '',
    scientificDegreeEn: row.scientific_degree_en || '',
  };
}

export async function getDynamicStaff(departmentId = null) {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    // Fallback to static local data
    if (!departmentId) return staffData;
    return staffData.filter((s) => s.departmentId === departmentId);
  }

  try {
    let query = supabase
      .from('staff_members')
      .select('*, departments (*)')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (departmentId) {
      // Find matching department by slug
      const { data: depts } = await supabase.from('departments').select('id, slug').eq('slug', departmentId);
      if (depts && depts.length > 0) {
        query = query.eq('department_id', depts[0].id);
      } else {
        // If department slug not found in db, fallback to local
        return staffData.filter((s) => s.departmentId === departmentId);
      }
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (!departmentId) return staffData;
      return staffData.filter((s) => s.departmentId === departmentId);
    }

    return data.map((row) => mapStaffRowToModel(row));
  } catch (err) {
    console.warn('Error fetching dynamic staff from Supabase, using local data:', err);
    if (!departmentId) return staffData;
    return staffData.filter((s) => s.departmentId === departmentId);
  }
}

export async function getDynamicDepartments() {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return departmentsData;
  }

  try {
    const { data, error } = await supabase
      .from('departments')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error || !data || data.length === 0) {
      return departmentsData;
    }

    return data.map((d) => ({
      id: d.slug,
      dbId: d.id,
      name: d.name_ka,
      nameEn: d.name_en,
      description: d.description_ka,
      descriptionEn: d.description_en,
      headStaffId: d.head_staff_id,
    }));
  } catch (err) {
    console.warn('Error fetching dynamic departments from Supabase, using local data:', err);
    return departmentsData;
  }
}
