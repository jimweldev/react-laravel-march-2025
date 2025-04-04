import { NavLink } from 'react-router';

interface SidebarLinkProps extends React.ComponentProps<typeof NavLink> {
  icon: React.ReactNode;
  title: string;
}

const SidebarLink = ({ icon, title, ...props }: SidebarLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return `hover:bg-sidebar-primary/20 hover:border-sidebar-primary flex items-center gap-2 border-l-2 px-4 py-3 text-sm transition-colors duration-300 ${
          isActive
            ? 'bg-sidebar-primary/20 border-sidebar-primary'
            : 'border-transparent'
        }`;
      }}
      {...props}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default SidebarLink;
