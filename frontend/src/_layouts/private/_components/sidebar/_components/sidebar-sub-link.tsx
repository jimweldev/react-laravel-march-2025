import { FaArrowRightLong } from 'react-icons/fa6';
import { NavLink } from 'react-router';

interface SidebarSubLinkProps extends React.ComponentProps<typeof NavLink> {
  icon: any;
  title: string;
}

const SidebarSubLink = ({ icon, title, ...props }: SidebarSubLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return `hover:text-sidebar-primary flex items-center gap-2 border-l-2 border-transparent px-4 py-3 pl-6 text-sm transition-colors duration-300 ${isActive ? 'text-sidebar-primary' : ''}`;
      }}
      {...props}
    >
      <FaArrowRightLong />
      {title}
    </NavLink>
  );
};

export default SidebarSubLink;
