-- ==============================================================================
-- TSU IICE Website — Fix Abstract Number Generator & Sequence
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/mvmivfunlszjpcuvnmzw/sql
-- ==============================================================================

-- 1. Create sequence if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS public.abstract_seq_2026;

-- 2. Dynamically set sequence value to max existing standard number (ignoring single outlier 202)
--    If max existing standard number is 41, this sets the sequence to 41 (is_called=true),
--    so the next call to nextval will return 42.
SELECT setval(
    'public.abstract_seq_2026',
    GREATEST(
        COALESCE(
            (
                SELECT MAX(NULLIF(regexp_replace(abstract_number, '\D', '', 'g'), '')::BIGINT)
                FROM public.conference_registrations_2026
                WHERE abstract_number ~* '^IICE-2026-\d+$'
                  AND NULLIF(regexp_replace(abstract_number, '\D', '', 'g'), '')::BIGINT < 200
            ),
            41
        ),
        41
    ),
    true
);

-- 3. Drop existing trigger if present
DROP TRIGGER IF EXISTS trigger_generate_abstract_number ON public.conference_registrations_2026;

-- 4. Replace generator function with collision-safe nextval sequence & auto-sync logic
CREATE OR REPLACE FUNCTION public.generate_abstract_number_2026()
RETURNS TRIGGER AS $$
DECLARE
    v_candidate TEXT;
    v_num INTEGER;
    v_seq_val BIGINT;
BEGIN
    -- If no abstract_number provided, generate sequential code with loop-collision check
    IF NEW.abstract_number IS NULL OR NEW.abstract_number = '' THEN
        LOOP
            v_candidate := 'IICE-2026-' || LPAD(nextval('public.abstract_seq_2026')::TEXT, 3, '0');
            EXIT WHEN NOT EXISTS (
                SELECT 1 FROM public.conference_registrations_2026 WHERE abstract_number = v_candidate
            );
        END LOOP;
        NEW.abstract_number := v_candidate;
    ELSE
        -- If abstract_number was explicitly provided (e.g. by Next.js API route),
        -- keep the database sequence synchronized if it's within standard range (< 200)
        IF NEW.abstract_number ~* '^IICE-2026-(\d+)$' THEN
            v_num := (regexp_match(NEW.abstract_number, '^IICE-2026-(\d+)$', 'i'))[1]::INTEGER;
            IF v_num < 200 THEN
                SELECT last_value INTO v_seq_val FROM public.abstract_seq_2026;
                IF v_num > v_seq_val THEN
                    PERFORM setval('public.abstract_seq_2026', v_num, true);
                END IF;
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Re-create the BEFORE INSERT trigger
CREATE TRIGGER trigger_generate_abstract_number
BEFORE INSERT ON public.conference_registrations_2026
FOR EACH ROW EXECUTE FUNCTION public.generate_abstract_number_2026();

-- 6. Confirmation query
SELECT 'TSU IICE: Abstract number sequence and collision-safe trigger configured successfully!' AS result;
