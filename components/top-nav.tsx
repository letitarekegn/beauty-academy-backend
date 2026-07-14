'use client';

import { useRouter } from 'next/navigation';
import { Bell, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

export function TopNav() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-card border-b border-border flex items-center justify-between px-6 z-20">
      <div className="flex-1" />
      
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-foreground hover:bg-muted rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Admin User</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
            AU
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-muted rounded-lg transition-colors"
            title="Log out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
