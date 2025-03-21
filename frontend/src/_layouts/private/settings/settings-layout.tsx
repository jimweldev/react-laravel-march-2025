import { useState } from 'react';
import { FaFingerprint, FaPalette, FaUser } from 'react-icons/fa6';
import { Outlet } from 'react-router';
import Footer from '../_components/footer/footer';
import Navbar from '../_components/navbar/navbar';
import Sidebar, { SidebarSection } from '../_components/sidebar/sidebar';

const SettingsLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarSections: SidebarSection[] = [
    {
      header: 'Settings',
      links: [
        {
          icon: <FaUser />,
          title: 'Profile',
          to: '/settings/profile',
        },
        {
          icon: <FaFingerprint />,
          title: 'Password',
          to: '/settings/password',
        },
        {
          icon: <FaPalette />,
          title: 'Theme',
          to: '/settings/theme',
        },
      ],
    },
  ];

  return (
    // wrapper
    <div className="flex h-screen w-screen overflow-hidden">
      {/* sidebar */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        sidebarSections={sidebarSections}
      />

      {/* main */}
      <div className="flex min-w-screen flex-1 flex-col overflow-hidden sm:min-w-0">
        {/* navbar */}
        <Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />

        <main className="main flex-1 overflow-x-hidden overflow-y-auto break-words">
          <div className="p-6">
            <Outlet />
          </div>
        </main>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SettingsLayout;
