import * as React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";

export interface ProvidersProps {
    children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
    return (
        <ClerkProvider>
            <ConfettiProvider />
            <ToastProvider />
            {children}
        </ClerkProvider>
    );
};
