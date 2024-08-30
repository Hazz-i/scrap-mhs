import HomeViews from "@/views/HomeView";
import { useRouter } from "next/router";

const SearchPhotos = () => {
	const { query } = useRouter();

	return (
		<>
			<title>Cari Foto</title>

			<main className={`flex min-h-screen flex-col items-center justify-start gap-12 py-10`}>
				<HomeViews />
			</main>
		</>
	);
};

export default SearchPhotos;
