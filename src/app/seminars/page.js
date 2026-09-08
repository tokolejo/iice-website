import { redirect } from 'next/navigation';

export default function SeminarsPage() {
    redirect('/news/?category=seminars');
}
