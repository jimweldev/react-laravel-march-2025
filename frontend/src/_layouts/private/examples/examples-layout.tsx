import { useState } from 'react';
import { BiJoystickButton } from 'react-icons/bi';
import { BsInputCursor } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa6';
import { FiCreditCard } from 'react-icons/fi';
import { LuHeading1 } from 'react-icons/lu';
import { PiTabs } from 'react-icons/pi';
import { TbTextGrammar } from 'react-icons/tb';
import { Outlet } from 'react-router';
import Footer from '../_components/footer/footer';
import Navbar from '../_components/navbar/navbar';
import Sidebar, { SidebarSection } from '../_components/sidebar/sidebar';

const ExamplesLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebarSections: SidebarSection[] = [
    {
      header: 'Examples',
      links: [
        {
          icon: <FiCreditCard />,
          title: 'Cards',
          to: '/examples',
          end: true,
        },
        {
          icon: <BiJoystickButton />,
          title: 'Buttons',
          to: '/examples/buttons',
        },
        {
          icon: <BsInputCursor />,
          title: 'Inputs',
          to: '/examples/inputs',
        },
        {
          icon: <PiTabs />,
          title: 'Tabs',
          to: '/examples/tabs',
          children: [
            {
              icon: <FaUsers />,
              title: 'Page Tabs',
              to: '/examples/tabs',
              end: true,
            },
            {
              icon: <FaUsers />,
              title: 'Card Tabs',
              to: '/examples/tabs/cards',
            },
          ],
        },
        {
          icon: <TbTextGrammar />,
          title: 'Editor',
          to: '/examples/editor',
        },
        {
          icon: <LuHeading1 />,
          title: 'Texts',
          to: '/examples/texts',
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

export default ExamplesLayout;
