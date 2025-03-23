import { ReactNode } from "react";
import { MainNav } from "../navigation/main-nav";
import { Sidebar } from "../navigation/sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <MainNav />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
