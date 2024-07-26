import Navigation from "./navigation";
import Menu from "./menu";
import TopBar from "./topbar";
// import { getServerSession } from "next-auth";
import { RiMenu2Line } from "@remixicon/react";
import * as React from "react";

export const metadata = {
  title: "Cynomi | User Dashboard",
  description: "This is a user sleep monitoring application",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      {/*Mobile header */}
      <header className="h-[64px] bg-background p-2 border-b w-full sticky top-0 z-50 flex flex-row items-center lg:!hidden">
        <button className="p-2 flex justify-center hover:bg-accent items-center rounded-lg ui-open:bg-slate-100 outline-primary-400">
          <RiMenu2Line className="h-5 w-5" />
        </button>
        <Menu />
      </header>
      {/* Alternative sidenav only header */}
      <div className="hidden xl:w-[296px] lg:w-[240px] lg:!block h-screen fixed border-r border-border bottom-0 left-0 pb-8">
        <div className="px-4">
          <Menu />
        </div>
        <div className="h-[calc(100vh-60px)] overflow-y-auto">
          <Navigation />
        </div>
      </div>
      <div className="lg:ml-[240px] xl:ml-[296px] relative z-0">
        <main className="h-screen relative w-full px-4 lg:!p-0">
          <TopBar />
          <div className="mt-[30px]">{children}</div>
        </main>
      </div>
    </>
  );
}
