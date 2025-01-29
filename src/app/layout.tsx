import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LeftSidebar from "@/components/LeftSidebar";
import { GlobalContextProvider } from "@/context/contextProvider";
import ShowPopover from "@/components/showPopover";

import Providers from "./Redux/Provider";
import FetchuserDetails from "@/components/Fetchuser";
import { ToastContainer } from 'react-toastify';
import MobileBarMenu from "@/components/MobileBarMenu";
import TopBar from "@/components/TopBar";
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
  title: "CROSS",
  description: "Social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>

          <GlobalContextProvider>

            <div className="w-full min-h-screen flex flex-row">
              <ToastContainer />
              <TopBar />
              <MobileBarMenu />

              <div className=" bg-gray-100 flex flex-row w-full">
                <div className="hidden sm:flex w-[8%] md:w-[22%] lg:w-[16%] h-screen bg-slate-800">
                  <LeftSidebar />
                </div>
                <div className="min-h-screen w-full sm:w-[92%] md:w-[78%] lg:w-[84%] relative">
                  {children}
                </div>
              </div>

              <FetchuserDetails />
              <ShowPopover />
            </div>

          </GlobalContextProvider>
        </Providers>
      </body>
    </html>
  );
}
