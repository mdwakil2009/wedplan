
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "WedPlan | Wedding Planning Platform",
  description: "Plan your dream wedding with WedPlan.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
