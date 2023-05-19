import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className='scroll-smooth' lang='en'>
      <Head />
      <body className='overflow-x-hidden overflow-y-scroll scroll-smooth bg-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
