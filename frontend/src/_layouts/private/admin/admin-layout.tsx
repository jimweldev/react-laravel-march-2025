import { useState } from 'react';
import { FaChartPie, FaUsers, FaUserShield } from 'react-icons/fa6';
import { Outlet } from 'react-router';
import Footer from '../_components/footer/footer';
import Navbar from '../_components/navbar/navbar';
import Sidebar, { SidebarSection } from '../_components/sidebar/sidebar';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarSections: SidebarSection[] = [
    {
      header: 'Admin',
      links: [
        {
          icon: <FaChartPie />,
          title: 'Dashboard',
          to: '/admin',
          end: true,
        },
        {
          icon: <FaUsers />,
          title: 'Users',
          to: '/admin/users',
        },
        {
          icon: <FaUserShield />,
          title: 'RBAC',
          to: '/admin/rbac',
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

        <main className="main @container/main flex-1 overflow-x-hidden overflow-y-auto break-words">
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

export default AdminLayout;
