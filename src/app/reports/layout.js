export const metadata = {
  title: 'სამეცნიერო ანგარიშები',
  description: 'თსუ რაფიელ აგლაძის არაორგანული ქიმიისა და ელექტროქიმიის ინსტიტუტის ყოველწლიური სამეცნიერო ანგარიშები და კვლევითი შედეგები.',
  alternates: {
    canonical: '/reports/',
  },
  openGraph: {
    title: 'სამეცნიერო ანგარიშები | TSU IICE',
    description: 'ინსტიტუტის ყოველწლიური სამეცნიერო ანგარიშები და მიღწევები.',
    url: 'https://iice.ge/reports/',
  },
};

export default function ReportsLayout({ children }) {
  return children;
}
