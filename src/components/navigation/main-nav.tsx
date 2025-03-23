import { Bell, MessageSquare, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export function MainNav() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="font-bold text-xl md:text-2xl hidden md:block">
            Loop Social
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-muted pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/messages")}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Avatar
            className="h-8 w-8 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
