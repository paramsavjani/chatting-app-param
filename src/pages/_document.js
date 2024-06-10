// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Add the Google Fonts link here */}
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                    {/* Add your other meta tags, title, etc. here */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
