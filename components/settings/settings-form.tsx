'use client';

import { Save } from 'lucide-react';

interface SettingsFormProps {
  onSave: () => void;
}

export function SettingsForm({ onSave }: SettingsFormProps) {
  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">General Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Academy Name</label>
            <input
              type="text"
              defaultValue="Arkani Beauty Academy"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Academy Email</label>
            <input
              type="email"
              defaultValue="admin@arkanibeauty.com"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+966-50-000-0000"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location</label>
            <input
              type="text"
              defaultValue="Riyadh, Saudi Arabia"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Payment Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Default Payment Currency</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>SAR (Saudi Riyal)</option>
              <option>USD (US Dollar)</option>
              <option>EUR (Euro)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Payment Reminder Days</label>
            <input
              type="number"
              defaultValue="3"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">Days before payment due date to send reminder</p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Notification Settings</h2>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="email-notif" defaultChecked className="w-4 h-4 rounded border-border" />
            <label htmlFor="email-notif" className="text-sm font-medium text-foreground">
              Email Notifications
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="sms-notif" className="w-4 h-4 rounded border-border" />
            <label htmlFor="sms-notif" className="text-sm font-medium text-foreground">
              SMS Notifications
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="payment-notif" defaultChecked className="w-4 h-4 rounded border-border" />
            <label htmlFor="payment-notif" className="text-sm font-medium text-foreground">
              Payment Notifications
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="system-notif" defaultChecked className="w-4 h-4 rounded border-border" />
            <label htmlFor="system-notif" className="text-sm font-medium text-foreground">
              System Updates
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Security Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Two-Factor Authentication</label>
            <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Disabled</option>
              <option>Enabled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <Save size={18} />
          Save Changes
        </button>
        <button className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium">
          Cancel
        </button>
      </div>
    </div>
  );
}
