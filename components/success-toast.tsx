'use client';

import { CheckCircle } from 'lucide-react';

interface SuccessToastProps {
  message: string;
}

export function SuccessToast({ message }: SuccessToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-accent/30 shadow-lg rounded-2xl px-5 py-4">
      <CheckCircle size={22} className="text-accent shrink-0" />
      <p className="text-sm font-semibold text-foreground">{message}</p>
    </div>
  );
}
