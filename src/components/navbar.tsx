import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto justify-between">
        <div className="font-bold text-xl">Loop Social</div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
