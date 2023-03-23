import React from "react";
import Link from "next/link";

function Header() {
  return (
    <Link href="/login" className="w-full bg-gray-100">
      Login
    </Link>
  );
}

export default Header;
