import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import Navbar from "@/components/Navbar";
import { CartProvider } from "@/features/context/CartContext";
import { ApolloProvider } from "@/providers/apollo-provider";
import { cn } from "@/utils/helpers/cn";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Store",
  description: "Game Store test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, "antialiased")}>
        <ApolloProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
