import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { Save, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../config/theme';
import { Moon, Sun, Check } from 'lucide-react';

interface GeneralSettings {
  institutionName: string;
  email: string;
  timezone: string;
  language: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  weeklyDigest: boolean;
}

const timezones = [
  'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00', 'UTC-07:00',
  'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:00', 'UTC-02:00', 'UTC-01:00',
  'UTC+00:00', 'UTC+01:00', 'UTC+02:00', 'UTC+03:00', 'UTC+04:00', 'UTC+05:00',
  'UTC+06:00', 'UTC+07:00', 'UTC+08:00', 'UTC+09:00', 'UTC+10:00', 'UTC+11:00',
  'UTC+12:00'
];

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

const Settings: React.FC = () => {
  const { currentTheme, isDarkMode, setCurrentTheme, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', name: 'Appearance' },
    { id: 'account', name: 'Account' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'security', name: 'Security' },
  ];

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    institutionName: 'EduDash Academy',
    email: 'admin@edudash.com',
    timezone: 'UTC+00:00',
    language: 'en'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleGeneralSettingChange = (key: keyof GeneralSettings, value: string) => {
    setIsEditing(true);
    setGeneralSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationSettingChange = (key: keyof NotificationSettings, value: boolean) => {
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
            <div className="space-y-6">
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
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notifications" className="block text-sm font-medium text-gray-700">
                  Notifications
                </label>
                <div className="mt-2 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="email-notifications" className="ml-3 block text-sm font-medium text-gray-700">
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="push-notifications"
                      name="push-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="push-notifications" className="ml-3 block text-sm font-medium text-gray-700">
                      Push notifications
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 