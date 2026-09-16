# Agent Guidelines & Best Practices for IICE Website

## 1. Mandatory Communication Language Policy (საკომუნიკაციო ენის სავალდებულო წესი)
- **ყოველთვის ქართულად ესაუბრე მომხმარებელს (Always communicate with the user in Georgian).**
- ყველა პასუხი, სტატუსის განახლება, ახსნა-განმარტება და დიალოგი მომხმარებელთან უნდა წარიმართოს **მხოლოდ ქართულ ენაზე**, თუ მომხმარებელი პირდაპირ არ მოითხოვს სხვა ენას.
- ტექნიკური ტერმინები, ფაილების ბილიკები, კოდის სტრუქტურები და ბრძანებები დატოვეთ ზუსტი და სწორად ფორმატირებული.

## 2. Mandatory Delegation: Specialized Subagents Architecture
ყველა ტიპის დავალება პროექტში უნდა გადანაწილდეს შესაბამის როლურ სუბაგენტზე. ახალი ჩატის/სესიის დაწყებისას, მთავარი აგენტი ვალდებულია საჭიროებისამებრ დაარეგისტრიროს (`define_subagent`) და გამოიძახოს (`invoke_subagent`) შემდეგი სპეციალიზებული სუბაგენტები:

### 1. `ui_ux_designer` (ინტერფეისისა და დიზაინის არქიტექტორი)
- **სფერო**: Next.js App Router და Tailwind CSS კომპონენტების შექმნა/სტილიზაცია.
- **პასუხისმგებლობა**:
  - IICE-ის ბრენდირებული ფერთა პალიტრის დაცვა (Deep Purple `#2D1540`, Rich Violet `#4A2069`, Gold `#D4AF37`).
  - მობილური ადაპტაცია (Responsive Layout) და შეხების ზონები (Touch targets ≥ 44px).
  - ინტერაქციული UI ელემენტები: მოდალები, ტაბების გადამრთველები, შედარების ბლოკები.
  - შესაბამისი უნარები: `modern-web-guidance`, `tailwind-design-system`, `ui-ux-designer`.

### 2. `academic_editor` (სამეცნიერო და ორენოვანი რედაქტორი)
- **სფერო**: აკადემიური შინაარსი, ორენოვანი ტექსტები და დონორთა სტანდარტები.
- **პასუხისმგებლობა**:
  - ქართული (`ka`) და ინგლისური (`en`) ენების მკაცრი და სუფთა გამიჯვნა (არანაირი ენობრივი აღრევა).
  - მომხსენებელთა წოდებები (აკადემიკოსი, პროფესორი, დოქტორი) და ინსტიტუციური კუთვნილება.
  - შოთა რუსთაველის ეროვნული სამეცნიერო ფონდის გრანტის ნომრის (`ISE-26-286`) მკაცრი დაცვა — ჩაიწეროს **მხოლოდ** ფონდის ბლოკში.
  - კონფერენციის ლოკაციების სიზუსტე (25 ნოემბერი: თსუ I კორპუსი; 26-27 ნოემბერი: თელავის უნივერსიტეტი. არასდროს მინდელის ქუჩა).
  - ძირითადი ფაილი: `src/lib/conferenceConstants.js`.

### 3. `backend_security_engineer` (ბექენდი, ადმინ-პანელი და უსაფრთხოება)
- **სფერო**: სერვერული ლოგიკა, ადმინ-პანელი, მონაცემთა ბაზა და უსაფრთხოება.
- **პასუხისმგებლობა**:
  - Next.js API Routes (`/api/admin/...`) და public endpoints.
  - Supabase / PostgreSQL მონაცემთა ბაზის მართვა და Row Level Security (RLS) წესები.
  - ადმინ-პანელის მოდულები: `/admin/conference`, `/admin/emails`, `/admin/news`, `/admin/staff`.
  - ავტომატური იმეილინგის სისტემა (Resend / SMTP) მონაწილეთა შეტყობინებებისთვის.
  - მონაცემთა ვალიდაცია, CSRF დაცვა და აუდიტის ლოგირება.
  - შესაბამისი უნარები: `security-auditor`, `postgresql`.

### 4. `media_graphics_processor` (გრაფიკული აქტივები და მედია)
- **სფერო**: გამოსახულებების დამუშავება, ლოგოების რედიზაინი და მედია აქტივები.
- **პასუხისმგებლობა**:
  - ლოგოების, სიმბოლიკისა და ბანერების დამუშავება (მაგ. Python/Pillow სკრიპტებით ტორუსის აღდგენა, რელიეფური ოქროსფერი წარწერები).
  - მომხსენებელთა ფოტოების სტანდარტიზაცია (კროპინგი, პროპორციები, WebP/PNG ფორმატები).
  - ვექტორული SVG ლოგოების ოპტიმიზაცია და ფაილების ზომების მინიმიზაცია.
  - სუფთა საქაღალდეების სტრუქტურა (`public/conference-2026/...`) და დროებითი scratch ფაილების გასუფთავება.

### 5. `qa_build_auditor` (ხარისხის კონტროლი, Build & აუდიტი)
- **სფერო**: პროექტის აწყობა, ვალიდაცია და სტატიკური ექსპორტის შემოწმება.
- **პასუხისმგებლობა**:
  - `npm run build` ბრძანების სრული გაშვება და შეცდომების (exit code 0) კონტროლი.
  - გატეხილი ბმულების, დაკარგული სურათების (404) და კონსოლის ერორების აღმოჩენა.
  - სატესტო გარემოს (`/conference-2026test`) დაცვა: სატესტო ცვლილებების პროდაქშენში (`/conference-2026`) ნაადრევი გაჟონვის პრევენცია.
  - ხელმისაწვდომობისა (WCAG) და Core Web Vitals მაჩვენებლების მონიტორინგი.

### 6. `research` (კვლევა და ძიება)
- **სფერო**: კოდბაზის სიღრმისეული ანალიზი, გარე დოკუმენტაციის, მეცნიერების პროფილებისა და ვებ-ინფორმაციის მოძიება სუფთა კონტექსტის შესანარჩუნებლად.

### 7. `self` (ავტონომიური იმპლემენტაცია)
- **სფერო**: იზოლირებული იმპლემენტაციური შტოების დამოუკიდებლად შესრულება.

---

## 3. Proactive Use of Skills
Before implementing code or design changes, activate and follow the corresponding skill directives:
- **modern-web-guidance**: MANDATORY first step for modern frontend, UI components, layouts, HTML5 semantics, and CSS styling.
- **nextjs-app-router-patterns**: For Next.js App Router routing, server/client components, streaming, data-fetching, metadata, and server actions.
- **tailwind-design-system**: For responsive Tailwind CSS utility classes, design tokens, color palette harmony (especially IICE Purple & Gold palette), and accessibility standards.
- **ui-ux-designer**: For visual polish, layout balance, typography hierarchy, mobile touch targets, and accessibility.
- **typescript-pro**: When writing or refactoring typed utilities, types, or interfaces.
- **security-auditor**: When handling authentication, API keys, Supabase RLS, input sanitization, or file uploads.

---

## 4. Conference 2026 Standards
- All conference content must be fully bilingual (Georgian `ka` and English `en`).
- Maintain pure language separation (no Georgian annotations leaking into English view).
- Preserve official academic titles, donor foundation requirements (Shota Rustaveli National Science Foundation [Grant number ISE-26-286]), and institutional affiliations accurately.
- Venue address for Nov 25: 1 Ilia Chavchavadze Ave. (TSU Building 1); Nov 26-27: 1 Kartuli Universiteti St., Telavi (TESAU). Never use E. Mindeli street for conference locations.
- Production Safety Rule: Do not overwrite `/conference-2026` until tests and previews on `/conference-2026test` are approved by the organizing committee.
