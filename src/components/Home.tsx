import Header from './LandingPage/Header';
import React, { useState } from 'react';
import { ThemeWrapperContext } from '../context/ThemeWrapper';
import Content from './LandingPage/Content';

export default function QuickStarter() {
  const themeUtils = React.useContext(ThemeWrapperContext);
  const [themeMode, setThemeMode] = useState<string>(themeUtils.colorMode);
  const [activeTab, setActiveTab] = useState<string>('Industry');

  const toggleColorMode = () => {
    setThemeMode((prevThemeMode) => {
      return prevThemeMode === 'light' ? 'dark' : 'light';
    });
    themeUtils.toggleColorMode();
  };

  return (
    <div>
      <Header themeMode={themeMode} toggleTheme={toggleColorMode} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ height: '100%', minHeight: '100vh', width: '100%', display: 'flex' }}>
        <Content activeTab={activeTab} />
      </div>
    </div>
  );
}