import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex mt-20">
      <div className="m-auto">
        <Image
          src="/logo.svg"
          alt="Jipok"
          width={180}
          height={280}
          className="rounded-xl shadow-md shadow-neutral-400/50"
        />
        <h1 className="text-5xl font-bold text-center tracking-widest -mr-0.5 mt-2">
          JIPOK
        </h1>
        <div className="text-center mt-20">
          <Button asChild>
            <Link href="/create">Play now</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
