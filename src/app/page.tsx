import Image from "next/image";
import Card from "./components/card";
import Dashboard from "./components/dashboard";
import Modal from "./components/confirmModal";

export default function Home() {
  return (
    <>
      <main className=" w-screen h-full overflow-x-hidden duration-300 bg-slate-200">
        <Dashboard />
        <Modal />
      </main>
    </>
  );
}
