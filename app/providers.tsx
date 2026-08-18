"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster
        theme="system"
        position="top-center"
        duration={1800}
        mobileOffset={16}
        toastOptions={{ className: "compass-toast" }}
      />
    </ThemeProvider>
  );
}
