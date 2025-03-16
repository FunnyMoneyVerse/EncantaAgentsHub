import { Montserrat, Roboto } from 'next/font/google';

// Load Montserrat font for headings
export const fontMontserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
    weight: ['400', '500', '600', '700', '800'],
});

// Load Roboto font for body text
export const fontRoboto = Roboto({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
    weight: ['300', '400', '500', '700'],
}); 