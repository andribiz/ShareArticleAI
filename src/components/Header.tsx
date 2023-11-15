import { SignedIn, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";

export default async function Header() {
  return (
    <nav className="sticky top-0 z-30 h-20 w-full transition-all duration-300">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8 3xl:px-10">
        <div className="flex items-center">
          <h2>Share Article AI</h2>
        </div>
        <div className="relative order-last flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="flex">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <div className="pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
