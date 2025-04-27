import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

// Extract constants outside the component
const timezones = React.lazy(() =>
  Promise.resolve({
    default: [
      'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00',
      'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC-01:00',
      'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00',
      'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00',
      'UTC+12:00',
    ]
  })
);

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }
];

enum Tabs {
  Appearance = 'appearance',
  Account = 'account',
  Notifications = 'notifications',
  Security = 'security',
}

const tabs = [
  { id: Tabs.Appearance, name: 'Appearance' },
  { id: Tabs.Account, name: 'Account' },
  { id: Tabs.Notifications, name: 'Notifications' },
  { id: Tabs.Security, name: 'Security' },
];

const Settings: React.FC = () => {
  const { currentTheme, isDarkMode, setCurrentTheme, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Appearance);

  const [generalSettings, setGeneralSettings] = useState({
    institutionName: 'EduDash Academy',
    email: 'admin@edudash.com',
    timezone: 'UTC+00:00',
    language: 'en'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleGeneralSettingChange = (key: keyof typeof generalSettings, value: string) => {
    setIsEditing(true);
    setGeneralSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationSettingChange = (key: keyof typeof notificationSettings, value: boolean) => {
    setIsEditing(true);
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveMessage({
        type: 'success',
        text: 'Settings saved successfully!'
      });
      setIsEditing(false);
    } catch (error) {
      setSaveMessage({
        type: 'error',
        text: 'Failed to save settings. Please try again.'
      });
    } finally {
      setIsSaving(false);
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleCancel = () => {
    // Reset to initial values
    setGeneralSettings({
      institutionName: 'EduDash Academy',
      email: 'admin@edudash.com',
      timezone: 'UTC+00:00',
      language: 'en'
    });
    setNotificationSettings({
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      weeklyDigest: true
    });
    setIsEditing(false);
    setSaveMessage(null);
  };

  // Extract reusable components for better readability
  const GeneralSettingsForm = () => (
    <div>
      <div>
        <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">
          Institution Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="institutionName"
            id="institutionName"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={generalSettings.institutionName}
            onChange={(e) => handleGeneralSettingChange('institutionName', e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={generalSettings.email}
            onChange={(e) => handleGeneralSettingChange('email', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const NotificationSettingsForm = () => (
    <div>
      <div>
        <label htmlFor="email-notifications" className="block text-sm font-medium text-gray-700">
          Email Notifications
        </label>
        <div className="mt-1">
          <input
            type="checkbox"
            id="email-notifications"
            checked={notificationSettings.emailNotifications}
            onChange={(e) => handleNotificationSettingChange('emailNotifications', e.target.checked)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="push-notifications" className="block text-sm font-medium text-gray-700">
          Push Notifications
        </label>
        <div className="mt-1">
          <input
            type="checkbox"
            id="push-notifications"
            checked={notificationSettings.pushNotifications}
            onChange={(e) => handleNotificationSettingChange('pushNotifications', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-4 py-5 sm:p-6">
            {activeTab === Tabs.Appearance && <GeneralSettingsForm />}
            {activeTab === Tabs.Notifications && <NotificationSettingsForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;