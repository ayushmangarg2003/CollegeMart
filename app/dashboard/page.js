import ButtonAccount from "@/components/ButtonAccount";
import config from "@/config";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <main className="min-h-screen pb-24">
      <div className="flex justify-between">
        <header className="bg-base-200 w-full flex justify-between px-8 py-4">
          <Link
            className="flex items-center gap-2 shrink-0 "
            href="/"
            title={`${config.appName} hompage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>

          <ButtonAccount/>
        </header>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold">Marketplace Here</h1>
    </main>
  );
}
