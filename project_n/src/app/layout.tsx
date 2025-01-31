import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/components/ui/toaster";
import SessionProvider from "./component/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ThemeProvider } from "./component/ThemeProvider";
import { CartProvider } from "@/app/context/cartContext";
import { UserProvider } from "./context/userContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matter",
  description: "Generated by create next app",
  icons: {
    icon: ["/pngtree.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main className="font-noto">
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <UserProvider>
                <CartProvider>{children}</CartProvider>
              </UserProvider>
            </ThemeProvider>
          </SessionProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
