import { Inter } from "next/font/google";
import HomeViews from "@/views/HomeView";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<title>Home</title>

			<main className={`flex items-center justify-center flex-col w-full h-screen gap-5`}>
				<h1 className="text-2xl font-bold">Cari Foto MHS Anda disini</h1>
				<Link
					href={`/find-image`}
					className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 py-2 px-5 rounded-lg">
					Mulai
				</Link>
			</main>
		</>
	);
}
