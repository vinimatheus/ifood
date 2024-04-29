import Header from "@/components/header";
import Search from "@/components/header/search";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="px-5 py-4">
        <Search />
      </div>
    </main>
  );
}
