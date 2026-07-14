'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Menu, X, BarChart3, Users, CreditCard, GraduationCap, Briefcase, Wallet, FileText, Settings } from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/', icon: BarChart3 },
    { label: 'Students', href: '/students', icon: Users },
    { label: 'Payments', href: '/payments', icon: CreditCard },
    { label: 'Graduation', href: '/graduation', icon: GraduationCap },
    { label: 'Employees', href: '/employees', icon: Briefcase },
    { label: 'Salary', href: '/salary', icon: Wallet },
    { label: 'Reports', href: '/reports', icon: FileText },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-primary text-primary-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border p-6 overflow-y-auto transition-transform duration-300 md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Arkani</h1>
          <p className="text-sm text-muted-foreground">Beauty Academy</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
              >
                <Icon size={20} className="group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-12 pt-6 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground mb-3">Support</p>
          <button className="w-full text-left px-4 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
            Help & Documentation
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
