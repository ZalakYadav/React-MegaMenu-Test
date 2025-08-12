import { useState, useEffect } from 'react';
import { Provider, teamsTheme, Flex, Text } from '@fluentui/react-northstar';
import { MegaMenu } from './components/MegaMenu';
import { MenuSettings } from './components/MenuSettings';
import { MenuStorageUtils } from './utils/menuStorage';
import type { MegaMenuData } from './types/menu';
import './App.css';

function App() {
  const [menuData, setMenuData] = useState<MegaMenuData>(() => MenuStorageUtils.loadMenuData());

  useEffect(() => {
    if (!MenuStorageUtils.hasStoredData()) {
      MenuStorageUtils.saveMenuData(menuData);
    }
  }, [menuData]);

  const handleSaveMenu = (newMenuData: MegaMenuData) => {
    setMenuData(newMenuData);
    MenuStorageUtils.saveMenuData(newMenuData);
  };

  const handleResetMenu = () => {
    const defaultData = MenuStorageUtils.resetMenuData();
    setMenuData(defaultData);
  };

  const sidebarItems = [
    {
      id: 'settings',
      title: 'Settings',
      items: [
        { id: 'step1', title: 'Step 1', icon: '🔗' },
        { id: 'step2', title: 'Step 2', icon: '🔗' },
        { id: 'step3', title: 'Step 3', icon: '🔗' }
      ]
    },
    {
      id: 'administration',
      title: 'Administration',
      items: [
        { id: 'licensing', title: 'Licensing', icon: '🔗' },
        { id: 'administrators', title: 'Administrators', icon: '🔗' }
      ]
    }
  ];

  return (
    <Provider theme={teamsTheme}>
      <div className="app-container">
        {/* Always show Mega Menu at the top */}
        <div className="mega-menu-section">
          <MegaMenu topNavItems={menuData.topNavItems} />
        </div>

        {/* Settings Section Below */}
        <div className="settings-layout">
          <Flex className="main-content" style={{ width: '100%' }}>
            {/* Left Sidebar */}
            <div className="sidebar">
              {sidebarItems.map((section) => (
                <div key={section.id} className="sidebar-section">
                  <div className="sidebar-section-header">
                    <div className="section-number">
                      {section.id === 'settings' ? '1' : '2'}
                    </div>
                    <Text content={section.title} weight="semibold" className="section-title" />
                  </div>
                  <div className="sidebar-items">
                    {section.items.map((item) => (
                      <div 
                        key={item.id} 
                        className={`sidebar-item ${item.id === 'step1' ? 'active' : ''}`}
                      >
                        <span className="item-icon">{item.icon}</span>
                        <Text content={item.title} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Content Area */}
            <div className="content-area">
              <div className="content-header">
                <Text content="Menu Configuration" size="largest" weight="bold" />
              </div>

              <div className="settings-content">
                <MenuSettings
                  menuData={menuData}
                  onSave={handleSaveMenu}
                  onReset={handleResetMenu}
                />
              </div>
            </div>
          </Flex>
        </div>
      </div>
    </Provider>
  );
}

export default App;
