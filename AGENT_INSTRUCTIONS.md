# Agent Guidelines & Best Practices for IICE Website

## 1. Mandatory Communication Language Policy (საკომუნიკაციო ენის სავალდებულო წესი)
- **ყოველთვის ქართულად ესაუბრე მომხმარებელს (Always communicate with the user in Georgian).**
- ყველა პასუხი, სტატუსის განახლება, ახსნა-განმარტება და დიალოგი მომხმარებელთან უნდა წარიმართოს **მხოლოდ ქართულ ენაზე**, თუ მომხმარებელი პირდაპირ არ მოითხოვს სხვა ენას.
- ტექნიკური ტერმინები, ფაილების ბილიკები, კოდის სტრუქტურები და ბრძანებები დატოვეთ ზუსტი და სწორად ფორმატირებული.

## 2. Mandatory Delegation: Subagents & Skills Policy
When working on any task within this codebase, always proactively assess and utilize specialized **subagents** and **skills** whenever appropriate:

### Proactive Use of Skills
Before implementing code or design changes, activate and follow the corresponding skill directives:
- **modern-web-guidance**: MANDATORY first step for modern frontend, UI components, layouts, HTML5 semantics, and CSS styling.
- **nextjs-app-router-patterns**: For Next.js App Router routing, server/client components, streaming, data-fetching, metadata, and server actions.
- **tailwind-design-system**: For responsive Tailwind CSS utility classes, design tokens, color palette harmony (especially IICE Purple & Gold palette), and accessibility standards.
- **ui-ux-designer**: For visual polish, layout balance, typography hierarchy, mobile touch targets, and accessibility.
- **typescript-pro**: When writing or refactoring typed utilities, types, or interfaces.
- **security-auditor**: When handling authentication, API keys, Supabase RLS, input sanitization, or file uploads.

### Autonomous Use of Subagents
For non-trivial tasks, leverage dedicated subagents to divide and conquer:
- **research subagent**: Delegate codebase exploration, web documentation searches, academic profile lookups, and asset discovery to maintain a clean context window.
- **self subagent**: Delegate self-contained implementation branches or complex parallel refactorings.

## 3. Conference 2026 Standards
- All conference content must be fully bilingual (Georgian `ka` and English `en`).
- Maintain pure language separation (no Georgian annotations leaking into English view).
- Preserve official academic titles, donor foundation requirements (Shota Rustaveli National Science Foundation [Grant number ISE-26-286]), and institutional affiliations accurately.
- Venue address for Nov 25: 1 Ilia Chavchavadze Ave. (TSU Building 1); Nov 26-27: 1 Kartuli Universiteti St., Telavi (TESAU). Never use E. Mindeli street for conference locations.
