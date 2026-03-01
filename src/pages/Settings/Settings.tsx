// src/pages/Settings/Settings.tsx
import React, { useState } from 'react';
import { mockSettings } from '../../data/mockData';
import { Setting } from '../../types';
import toast from 'react-hot-toast';
import './Settings.css';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>(mockSettings);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditSetting = (setting: Setting) => {
    setEditingKey(setting.key);
    setEditValue(setting.value);
  };

  const handleSaveSetting = (key: string) => {
    setSettings(settings.map(s => 
      s.key === key ? { ...s, value: editValue } : s
    ));
    setEditingKey(null);
    toast.success('Setting updated successfully!');
  };

  const filteredSettings = settings.filter(setting =>
    setting.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setting.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSettingValue = (setting: Setting) => {
    if (editingKey === setting.key) {
      return (
        <div className="edit-value">
          {setting.type === 'boolean' ? (
            <select 
              value={editValue} 
              onChange={(e) => setEditValue(e.target.value)}
              className="edit-select"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          ) : setting.type === 'select' ? (
            <select 
              value={editValue} 
              onChange={(e) => setEditValue(e.target.value)}
              className="edit-select"
            >
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="2 hours">2 hours</option>
              <option value="1 day">1 day</option>
            </select>
          ) : (
            <input
              type={setting.type === 'number' ? 'number' : 'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="edit-input"
              autoFocus
            />
          )}
          <button className="save-btn" onClick={() => handleSaveSetting(setting.key)}>✓</button>
          <button className="cancel-btn" onClick={() => setEditingKey(null)}>✗</button>
        </div>
      );
    }

    return (
      <div className="display-value">
        <span>{setting.value}</span>
        <button className="edit-btn" onClick={() => handleEditSetting(setting)}>✏️</button>
      </div>
    );
  };

  return (
    <div className="settings">
      <div className="page-header">
        <div>
          <h1>System Settings</h1>
          <p className="subtitle">System management and detailed overview.</p>
        </div>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search keys or descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="settings-table-container">
        <table className="settings-table">
          <thead>
            <tr>
              <th>KEY</th>
              <th>DESCRIPTION</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            {filteredSettings.map(setting => (
              <tr key={setting.key}>
                <td>
                  <code className="setting-key">{setting.key}</code>
                </td>
                <td className="setting-description">{setting.description}</td>
                <td className="setting-value">
                  {renderSettingValue(setting)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;