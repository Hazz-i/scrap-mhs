import { Inter } from "next/font/google";
import HomeViews from "@/views/HomeView";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main className={`flex min-h-screen flex-col items-center justify-start gap-12 py-10`}>
			<HomeViews />
		</main>
	);
}
