import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LeftSidebar from "@/components/LeftSidebar";
import { GlobalContextProvider } from "@/context/contextProvider";
import ShowPopover from "@/components/showPopover";

import Providers from "./Redux/Provider";
import FetchuserDetails from "@/components/Fetchuser";
import { ToastContainer } from 'react-toastify';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jiiwal",
  description: "Social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>

          <GlobalContextProvider>

            <div className="w-full min-h-screen flex flex-row bg-gray-100">
              <ToastContainer />
              <LeftSidebar />

              <div className="min-h-screen w-full sm:w-[80vw] md:w-[82vw] sm:left-20 md:left-[16vw] relative">
                {children}
                <FetchuserDetails />
              </div>

              <ShowPopover />

            </div>

          </GlobalContextProvider>
        </Providers>
      </body>
    </html>
  );
}
