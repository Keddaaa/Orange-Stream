import React from 'react';
import { Save } from 'lucide-react';
import { useUserPreferences } from '../../hooks/useUserPreferences';

export function UserPreferences() {
  const { preferences, updatePreferences } = useUserPreferences();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Préférences</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Lecture</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Lecture automatique</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.autoplay}
                  onChange={(e) => updatePreferences({ autoplay: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>Qualité vidéo par défaut</span>
              <select
                value={preferences.quality}
                onChange={(e) => updatePreferences({ quality: e.target.value as any })}
                className="bg-gray-700 rounded-lg px-4 py-2"
              >
                <option value="SD">SD (480p)</option>
                <option value="HD">HD (720p)</option>
                <option value="FHD">Full HD (1080p)</option>
                <option value="4K">4K (2160p)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span>Sous-titres</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.subtitles}
                  onChange={(e) => updatePreferences({ subtitles: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Interface</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Thème</span>
              <select
                value={preferences.theme}
                onChange={(e) => updatePreferences({ theme: e.target.value as any })}
                className="bg-gray-700 rounded-lg px-4 py-2"
              >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <span>Langue</span>
              <select
                value={preferences.language}
                onChange={(e) => updatePreferences({ language: e.target.value as any })}
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
                  checked={preferences.notifications}
                  onChange={(e) => updatePreferences({ notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
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