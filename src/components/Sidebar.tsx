import Image from "next/image";
import MenuItem from "@/components/MenuItem";
import Link from "next/link";

export const menuItems = [
  {
    name: "Share Generator",
    href: "/",
  },
  {
    name: "Subtitle Generator",
    href: "/subtitle",
  },
];

export default async function Sidebars() {
  return (
    <aside className="top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body left-0 border-r dark:border-gray-700 dark:bg-dark xs:w-50 xl:fixed  xl:w-72 2xl:w-80">
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        {/* <Image */}
        {/*   src="/images/logo-white.webp" */}
        {/*   width={140} */}
        {/*   height={80} */}
        {/*   alt="Icon" */}
        {/* /> */}
      </div>

      <div className="px-6 pb-5 2xl:px-8">
        <div className="mt-12">
          {menuItems.map((item, index) => (
            <MenuItem
              key={"menu-item" + item.name + index}
              name={item.name}
              href={item.href}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 w-full">
        <div className="text-sm text-center text-gray-500">
          © 2023{" "}
          <a href="https://bettle.gg" className="hover:underline">
            bettle.gg
          </a>
        </div>
        <div className="text-sm text-center text-gray-500">
          All Rights Reserved.
        </div>
      </div>
    </aside>
  );
}
