import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mt-12 flex p-4">
      <div className="m-auto">
        <Image
          src="/logo.svg"
          alt="Tjipok"
          width={180}
          height={280}
          priority={true}
          className="rounded-xl shadow-md shadow-neutral-400/50"
        />
        <h1 className="-mr-0.5 mt-2 text-center text-4xl font-bold tracking-widest">
          TJIPOK
        </h1>
        <div className="mt-20 text-center">
          <Button asChild>
            <Link href="/create">Play now</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
