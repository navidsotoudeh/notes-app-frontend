//libraries
import { useEffect } from "react";
import Header from "@/components/header/Header";

export default function Layout({ children }) {
  return (
    <main className="">
      {children}
      <div className="bg-yellow-200">assa</div>
    </main>
  );
}
