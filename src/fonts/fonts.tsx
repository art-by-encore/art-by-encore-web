import localFont from 'next/font/local';

const Montserrat300 = localFont({
    src: [{ path: './Montserrat-300.ttf' }],
    variable: '--font-montserrat-300',
});
const Montserrat400 = localFont({
    src: [{ path: './Montserrat-400.ttf' }],
    variable: '--font-montserrat-400',
});

const Montserrat500 = localFont({
    src: [{ path: './Montserrat-500.ttf' }],
    variable: '--font-montserrat-500',
});

const Montserrat600 = localFont({
    src: [{ path: './Montserrat-600.ttf' }],
    variable: '--font-montserrat-600',
});

const Montserrat700 = localFont({
    src: [{ path: './Montserrat-700.ttf' }],
    variable: '--font-montserrat-700',
});


const Montserrat800 = localFont({
    src: [{ path: './Montserrat-800.ttf' }],
    variable: '--font-montserrat-800',
});


export const fonts = `${Montserrat300.variable} ${Montserrat400.variable} ${Montserrat500.variable} ${Montserrat600.variable} ${Montserrat700.variable} ${Montserrat800.variable}  `;
