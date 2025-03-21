import React from 'react';
import {
  FaBarsStaggered,
  FaRegBell,
  FaRegMessage,
  FaRightFromBracket,
  FaUser,
} from 'react-icons/fa6';
import { Link } from 'react-router';
import useAuthUserStore from '@/_stores/auth-user.store';
import fallbackImage from '@/assets/images/default-avatar.png';
import ReactImage from '@/components/images/react-image';
import ThemeToggle from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import NavbarLinks from './_components/navbar-links';

interface NavbarProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar = ({ isSidebarCollapsed, setIsSidebarCollapsed }: NavbarProps) => {
  const { user, clearAuthUser } = useAuthUserStore();

  return (
    <div className="bg-card flex items-center justify-between gap-4 border-b p-3">
      <div className="flex items-center gap-4">
        {/* toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          <FaBarsStaggered />
        </Button>

        <Separator className="h-4 min-h-0" orientation="vertical" />

        <div className="flex items-center gap-2">
          <NavbarLinks />
        </div>
      </div>

      {/* profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* messages */}
            <Button variant="ghost" size="icon">
              <FaRegMessage />
            </Button>

            {/* notifications */}
            <Button variant="ghost" size="icon">
              <FaRegBell />
            </Button>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* avatar */}
            <div className="outline-primary border-card flex aspect-square h-8 cursor-pointer items-center overflow-hidden rounded-full border-1 outline-2 select-none">
              <ReactImage
                className="pointer-events-none h-full w-full object-cover"
                src={
                  `${import.meta.env.VITE_STORAGE_BASE_URL}/avatars/${user?.avatar}` ||
                  fallbackImage
                }
                fallback={fallbackImage}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-muted-foreground mx-1 w-50">
            <Link to="/settings/profile">
              <DropdownMenuItem>
                <FaUser className="text-inherit" />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={clearAuthUser}>
              <FaRightFromBracket className="text-inherit" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
