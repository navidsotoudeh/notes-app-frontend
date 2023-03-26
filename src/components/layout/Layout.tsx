//libraries
import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Layout({ children }) {
  const [sidebarStatus, setSidebarStatus] = useState(true);

  return (
    <main className="flex min-w-screen min-h-screen flex-col bg-red-100">
      <Header />
      <div className="flex h-[calc(100vh_-_50px)] w-full bg-green-400">
        <Sidebar
          sidebarStatus={sidebarStatus}
          onClose={() => setSidebarStatus((prevState) => !prevState)}
        />
        <div className="">{children}</div>
      </div>
    </main>
  );
}
