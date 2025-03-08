import { CgMenuGridO } from 'react-icons/cg';
import { FaCode, FaHouse, FaUserGear } from 'react-icons/fa6';
import { NavLink, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NavbarLinks = () => {
  const location = useLocation();
  const excludedPaths = ['/admin', '/examples', '/profile'];
  const isExcluded = excludedPaths.some(path =>
    location.pathname.startsWith(path),
  );

  const paths = [
    {
      path: '/admin',
      icon: <FaUserGear className="text-inherit" />,
      label: 'Admin',
    },
    { path: '/', icon: <FaHouse className="text-inherit" />, label: 'Home' },
    {
      path: '/examples',
      icon: <FaCode className="text-inherit" />,
      label: 'Examples',
    },
  ];

  return (
    <>
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <CgMenuGridO />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50">
            {paths.map(path =>
              path.path === '/' ? (
                <NavLink
                  to="/"
                  key={path.path}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {() => {
                    const active = !isExcluded;
                    return (
                      <DropdownMenuItem
                        className={`${
                          active
                            ? 'bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground'
                            : 'focus:bg-accent focus:text-accent-foreground'
                        }`}
                      >
                        {path.icon}
                        {path.label}
                      </DropdownMenuItem>
                    );
                  }}
                </NavLink>
              ) : (
                <NavLink
                  to={path.path}
                  key={path.path}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {({ isActive }) => (
                    <DropdownMenuItem
                      className={`${
                        isActive
                          ? 'bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground'
                          : 'focus:bg-accent focus:text-accent-foreground'
                      }`}
                    >
                      {path.icon}
                      {path.label}
                    </DropdownMenuItem>
                  )}
                </NavLink>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden gap-2 sm:flex">
        {paths.map(path =>
          path.path === '/' ? (
            <NavLink to={path.path} className="" key={path.path}>
              {() => {
                const active = !isExcluded;
                return (
                  <Button variant={active ? 'default' : 'ghost'} size="icon">
                    {path.icon}
                  </Button>
                );
              }}
            </NavLink>
          ) : (
            <NavLink to={path.path} className="" key={path.path}>
              {({ isActive }) => (
                <Button variant={isActive ? 'default' : 'ghost'} size="icon">
                  {path.icon}
                </Button>
              )}
            </NavLink>
          ),
        )}
      </div>
    </>
  );
};

export default NavbarLinks;
