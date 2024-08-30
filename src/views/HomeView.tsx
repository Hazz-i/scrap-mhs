import * as React from "react";
import DropdownAngkatan from "@/components/elements/dropdowns/dropdownAngkatan";
import DropdownFakultas from "@/components/elements/dropdowns/dropdownFakultas";
import prodi from "@/components/prodi";
import { Input } from "@/components/ui/input";
import Modal from "@/components/elements/modals/modal";
import ModalWarning from "@/components/elements/modals/modalWarning";
import axiosClient from "@/config/axios";
import { ModeToggle } from "@/components/toogleDarkMode";
import ImageShet from "@/components/elements/imageShet";
import { Button } from "@/components/ui/button";

const HomeViews = () => {
	const [nimStart, setNimStart] = React.useState<any>();
	const [nimEnd, setNimEnd] = React.useState<any>();
	const [kodeProdi, setKodeProdi] = React.useState<string>("");
	const [angkatan, setAngkatan] = React.useState<string>("");

	const currentYear = new Date().getFullYear();
	const yearsArray = Array.from({ length: currentYear - 2015 + 1 }, (_, index) =>
		(2015 + index).toString()
	);

	const [isValue, setIsValue] = React.useState<string>("");
	const [fakultas, setFakultas] = React.useState<string>("");

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [downloadLoading, setDownloadLoading] = React.useState<boolean>(false);
	const [isClear, setIsClear] = React.useState<boolean>(false);

	const [allUrls, setAllurls] = React.useState<string[]>([]);

	React.useEffect(() => {
		const foundItem = prodi.find((item: any) => item.kode === kodeProdi);
		foundItem ? setFakultas(`${foundItem.jenjang} - ${foundItem.nama_prodi}`) : setFakultas("");
	}, [kodeProdi]);

	React.useEffect(() => {
		nimStart &&
			nimEnd !== undefined &&
			setIsValue(
				`${angkatan} / ${fakultas} / ${angkatan.slice(
					2
				)}.${kodeProdi}.${nimStart} - ${angkatan.slice(2)}.${kodeProdi}.${nimEnd}`
			);
	}, [fakultas, angkatan, nimStart, nimEnd]);

	const handleSearch = async () => {
		if (!nimStart || !nimEnd) {
			setIsClear(true);
			return;
		}
		try {
			setIsLoading(true);
			const response = await axiosClient.get(`/${angkatan}/${kodeProdi}/${nimStart}-${nimEnd}`);
			setAllurls(response.data.data);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDownloadAll = async () => {
		try {
			setDownloadLoading(true);
			const response = await axiosClient.post(
				"/download_zip_from_urls",
				{
					urls: allUrls,
				},
				{
					responseType: "blob",
				}
			);

			// Membuat link untuk download
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute(
				"download",
				`${angkatan.slice(2)}.${kodeProdi}.${nimStart}-${angkatan.slice(
					2
				)}.${kodeProdi}.${nimEnd}.zip`
			);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Error downloading ZIP:", error);
		} finally {
			setDownloadLoading(false);
		}
	};

	return (
		<>
			<span className="flex flex-col gap-10 text-center w-full items-center justify-center">
				<h1 className="font-bold  flex items-center justify-center gap-2 lg:gap-5">
					<span className="text-2xl lg:text-4xl">Cari Foto Mahasiswa</span>
					<ModeToggle />
				</h1>
				<span className="grid gap-5 px-5 lg:px-0">
					<div className="flex flex-col lg:flex-row w-full items-end justify-center gap-2">
						<Input
							type="text"
							className="max-w-lg"
							readOnly
							value={isValue}
							placeholder="Diisi melalu form di bawah"
						/>
						<Modal
							title="Cari"
							dialogTitle="Apakah anda yakin ingin mencari data ini?"
							description="Pastikan data yang anda masukkan benar agar tidak terjadi kesalahan"
							handleConfirm={handleSearch}
							isLoading={isLoading}
						/>
					</div>
					<div className="flex w-full items-end space-x-2 justify-center">
						<DropdownAngkatan
							title="Angkatan"
							value={yearsArray.reverse()}
							setIsValue={setAngkatan}
						/>
						<DropdownFakultas title="Prodi" value={prodi} setIsValue={setKodeProdi} />
						<Input
							type="number"
							className="max-w-32"
							placeholder="nim mulai"
							onChange={(e: any) => setNimStart(e.target.value)}
						/>
						<Input
							type="number"
							className="max-w-32"
							placeholder="nim berhenti"
							onChange={(e: any) => setNimEnd(e.target.value)}
						/>
					</div>
				</span>
			</span>

			{isLoading ? (
				<div className="text-2xl font-semibold border w-[90vw] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-col min-h-[70vh] p-5">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
				</div>
			) : allUrls.length === 0 ? (
				<div className="text-2xl font-semibold border w-[90vw] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center min-h-[70vh] p-5">
					<h1>Tidak Ada Data !</h1>
				</div>
			) : (
				<div className="w-[90vw] bg-gray-100 dark:bg-gray-800 rounded-lg grid gap-10 p-5 pb-16">
					<span className="flex items-center justify-between px-2 text-sm">
						<h1>
							<span className="font-semibold lg:text-lg">" {allUrls.length} "</span> total data di
							temukan
						</h1>
						<Button onClick={handleDownloadAll} disabled={downloadLoading}>
							{downloadLoading ? "Proses sek Cik !" : "Download All"}
						</Button>
					</span>
					<span className="flex flex-wrap gap-5 items-center justify-center">
						{allUrls?.map((url: string, index: number) => (
							<ImageShet key={index} img_url={url} data={fakultas} />
						))}
					</span>
				</div>
			)}

			{isClear && (
				<ModalWarning
					isOpen={isClear}
					setIsOpen={setIsClear}
					dialogTitle="Peringatan"
					description="NIM tidak boleh kosong"
				/>
			)}
		</>
	);
};

export default HomeViews;
