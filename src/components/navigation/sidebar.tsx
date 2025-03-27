import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Briefcase,
  MessageSquare,
  UserCircle,
  LogOut,
  TrendingUp,
  Calendar,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link to={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-1 sm:gap-2 px-2 py-2",
          isActive ? "bg-muted font-medium" : "font-normal",
        )}
      >
        {icon}
        <span className="hidden md:inline-flex">{label}</span>
      </Button>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await import("@/lib/auth").then(({ signOut }) => signOut());
      // Clear all auth data
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Clear all auth data even on error
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      navigate("/login", { replace: true });
    }
  };

  const navItems = [
    {
      href: "/feed",
      icon: <Home className="h-5 w-5" />,
      label: "Feed",
    },
    {
      href: "/profile",
      icon: <UserCircle className="h-5 w-5" />,
      label: "Profile",
    },
    {
      href: "/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
    },
    {
      href: "/groups",
      icon: <Users className="h-5 w-5" />,
      label: "Communities",
    },
    {
      href: "/trending",
      icon: <TrendingUp className="h-5 w-5" />,
      label: "Trending",
    },
    {
      href: "/events",
      icon: <Calendar className="h-5 w-5" />,
      label: "Events",
    },
    {
      href: "/jobs",
      icon: <Briefcase className="h-5 w-5" />,
      label: "Jobs",
    },
  ];

  return (
    <aside className="fixed left-0 z-20 flex h-full w-14 flex-col border-r bg-background sm:w-16 md:w-64 transition-all duration-300">
      <div className="flex h-16 items-center border-b px-2 sm:px-4">
        <Link to="/feed" className="flex items-center gap-2">
          <div className="rounded-full bg-primary p-1 flex-shrink-0">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl hidden md:inline-flex truncate">
            Loop Social
          </span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-1 sm:p-2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.href}
          />
        ))}
      </nav>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden md:inline-flex">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
