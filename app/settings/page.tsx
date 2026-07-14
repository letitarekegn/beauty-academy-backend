import { AccountSettingsForm } from '@/components/settings/account-settings-form';

export default function SettingsPage() {
  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account details</p>
        </div>

        {/* Account Settings */}
        <AccountSettingsForm />
      </div>
    </main>
  );
}
