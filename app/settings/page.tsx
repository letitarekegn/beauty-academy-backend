'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { SettingsForm } from '@/components/settings/settings-form';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage system configuration and preferences</p>
        </div>

        {/* Success Message */}
        {isSaved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
          </div>
        )}

        {/* Settings Form */}
        <SettingsForm onSave={handleSave} />
      </div>
    </main>
  );
}
