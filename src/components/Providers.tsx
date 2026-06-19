"use client";

import { SessionProvider } from "@/components/SessionProvider";
import { CompareProvider } from "@/contexts/CompareContext";
import { CompareBar } from "@/components/CompareBar";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CompareProvider>
        {children}
        <CompareBar />
      </CompareProvider>
    </SessionProvider>
  );
}
