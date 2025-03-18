import VerticalScrollbar from '@/components/scrollbars/vertical-scrollbar';
import ThemeToggle from '@/components/theme/theme-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import SidebarLink from './_components/sidebar-link';
import SidebarSubLink from './_components/sidebar-sub-link';

interface SidebarProps {
  isSidebarCollapsed: boolean;
  sidebarSections: SidebarSection[];
}

// Define the structure of sidebar links
interface SidebarLinkItem {
  icon: React.ReactNode;
  title: string;
  to: string;
  children?: SidebarLinkItem[];
  end?: boolean;
}

// Define the structure of sidebar sections
export interface SidebarSection {
  header: string;
  links: SidebarLinkItem[];
}

const Sidebar = ({ isSidebarCollapsed, sidebarSections }: SidebarProps) => {
  return (
    <div
      className={`bg-sidebar text-sidebar-foreground flex-[0_0_250px] overflow-hidden shadow transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? 'ml-0 lg:ml-[-250px]' : 'ml-[-250px] lg:ml-0'
      }`}
    >
      {/* <ScrollArea className="h-full"> */}
      <VerticalScrollbar>
        <h4 className="p-3 text-center text-2xl font-semibold">
          {import.meta.env.VITE_APP_NAME}
        </h4>

        {sidebarSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Sidebar Section Header */}
            <h4 className="pt-4 pb-1 pl-4 text-xs">{section.header}</h4>

            {section.links.map((link, index) => (
              <div key={index}>
                <SidebarLink
                  icon={link.icon}
                  title={link.title}
                  to={link.to}
                  end={link.end}
                />

                {link.children &&
                  link.children.map((child, childIndex) => (
                    <SidebarSubLink
                      key={childIndex}
                      icon={child.icon}
                      title={child.title}
                      to={child.to}
                      end={child.end}
                    />
                  ))}
              </div>
            ))}
          </div>
        ))}
        <ThemeToggle />
      </VerticalScrollbar>
      {/* </ScrollArea> */}
    </div>
  );
};

export default Sidebar;
