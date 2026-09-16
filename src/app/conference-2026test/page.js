import Conference2026TestView from '../../components/Conference2026TestView';

export const metadata = {
  title: 'III საერთაშორისო სამეცნიერო კონფერენცია 2026 (სატესტო ვერსია / Sandbox)',
  description: 'მე-3 საერთაშორისო სამეცნიერო კონფერენცია: „თანამედროვე ტენდენციები ქიმიაში, ქიმიურ ტექნოლოგიებსა და მომიჯნავე დარგებში: მწვანე ენერგეტიკის პერსპექტივები, ეკოლოგიური მდგრადობა, სურსათის უვნებელობა. 2026“ (სატესტო გარემო)',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/conference-2026test/',
  },
};

export default function Conference2026TestPage() {
  return <Conference2026TestView />;
}
