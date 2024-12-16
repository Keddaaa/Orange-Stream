import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import type { UserProfile } from '../../types/auth';

export function ProfileSettings() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: user?.name || '',
    email: user?.email || '',
    preferences: user?.preferences || {
      language: 'fr',
      notifications: true,
      autoplay: true,
      defaultVideoQuality: 'HD',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Paramètres du profil</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
            <button
              type="button"
              className="absolute bottom-0 right-0 p-1 bg-red-500 rounded-full hover:bg-red-600 transition"
            >
              <Upload className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h3 className="font-medium">{user.name}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nom
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Préférences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Langue</span>
              <select
                value={formData.preferences?.language}
                onChange={(e) => setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences!,
                    language: e.target.value as 'fr' | 'en',
                  },
                })}
                className="bg-gray-700 rounded-lg px-4 py-2"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferences?.notifications}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences!,
                      notifications: e.target.checked,
                    },
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>Lecture automatique</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferences?.autoplay}
                  onChange={(e) => setFormData({
                    ...formData,
                    preferences: {
                      ...formData.preferences!,
                      autoplay: e.target.checked,
                    },
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>Qualité vidéo par défaut</span>
              <select
                value={formData.preferences?.defaultVideoQuality}
                onChange={(e) => setFormData({
                  ...formData,
                  preferences: {
                    ...formData.preferences!,
                    defaultVideoQuality: e.target.value as 'SD' | 'HD' | 'FHD' | '4K',
                  },
                })}
                className="bg-gray-700 rounded-lg px-4 py-2"
              >
                <option value="SD">SD (480p)</option>
                <option value="HD">HD (720p)</option>
                <option value="FHD">Full HD (1080p)</option>
                <option value="4K">4K (2160p)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-red-700 transition"
        >
          <Save className="h-5 w-5" />
          <span>Enregistrer les modifications</span>
        </button>
      </form>
    </div>
  );
}