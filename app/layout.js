import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./redux/providers";
import { Lato, Playwrite_AU_NSW } from "next/font/google";


const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], // choose weights you need
  variable: "--font-lato",
});

const playwrite = Playwrite_AU_NSW({
  subsets: ["latin"],
  weight: ["400"], // this font may have limited weights
  variable: "--font-playwrite",
});


export const metadata = {
  title: "Buy & Send Restaurant Gift Vouchers Online – Instant Dining Gift Cards for Birthdays, Anniversaries & Special Occasions.",
  description: "Send personalized restaurant gift vouchers in minutes. Discover top restaurants, choose your amount, and deliver a unique dining experience instantly. Perfect for birthdays, anniversaries, or any celebration. Secure, fast, and hassle-free.",
  openGraph: {
    title: "Gift the Joy of Dining – Restaurant Gift Vouchers Made Easy",
    description:
      "Send personalized restaurant gift vouchers in minutes. Perfect for birthdays, anniversaries, weddings, or any celebration. Secure, fast, and hassle-free.",
    // url: "https://yourwebsite.com",
    siteName: "Treatbite",
    // images: [
    //   {
    //     url: "https://yourwebsite.com/images/social-preview.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Restaurant Gift Vouchers",
    //   },
    // ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${lato.variable} ${playwrite.variable} antialiased font-lato`}
      >
        <Providers>

          <Toaster position="top-center" />
          {children}

        </Providers>
      </body>
    </html>
  );
}
