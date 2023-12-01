"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type MenuItemProps = {
  name?: string;
  icon: React.ReactNode;
  href: string;
};

export default function MenuItem({ name, icon, href }: MenuItemProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.includes(`${href}/`);

  return (
    <div className="mb-2 min-h-[48px] list-none last:mb-0">
      <Link
        href={{
          pathname: href,
        }}
        className={cn(
          "relative flex h-12 items-center whitespace-nowrap rounded-lg px-4 text-sm text-gray-500 transition-all hover:text-brand dark:hover:text-white",
          {
            "text-green": active,
          }
        )}
      >
        <span
          className={cn(
            "relative z-[1] duration-100 before:absolute before:-right-3 before:top-[50%] before:h-1 before:w-1 before:-translate-y-2/4 before:rounded-full before:bg-none mr-3"
          )}
        >
          {icon}
        </span>
        <span className="relative z-[1] "> {name}</span>
      </Link>
    </div>
  );
}
