import ButtonAccount from "@/components/ButtonAccount";
import config from "@/config";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";

export const dynamic = "force-dynamic";

export default async function Profile() {
  return (
    <main className="min-h-screen pb-24">
      <h1 className="text-3xl md:text-4xl font-extrabold">Marketplace Here</h1>
    </main>
  );
}
