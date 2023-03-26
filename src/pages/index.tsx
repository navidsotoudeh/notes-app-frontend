import Link from "next/link";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline bg-yellow-200">
        Hello world! This home page
      </h1>
    </>
  );
}
