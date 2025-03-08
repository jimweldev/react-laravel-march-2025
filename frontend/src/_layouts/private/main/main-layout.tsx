import { useState } from 'react';
import { FaChartPie } from 'react-icons/fa6';
import { Outlet } from 'react-router';
import Footer from '../_components/footer/footer';
import Navbar from '../_components/navbar/navbar';
import Sidebar, { SidebarSection } from '../_components/sidebar/sidebar';

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarSections: SidebarSection[] = [
    {
      header: 'General',
      links: [
        {
          icon: <FaChartPie />,
          title: 'Dashboard',
          to: '/',
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
      <div className="xs:min-w-auto flex min-w-screen flex-1 flex-col overflow-hidden">
        {/* navbar */}
        <Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />

        <main className="main flex-1 overflow-y-auto">
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

export default MainLayout;
