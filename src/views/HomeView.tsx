import * as React from "react";
import DropdownAngkatan from "@/components/elements/dropdowns/dropdownAngkatan";
import DropdownFakultas from "@/components/elements/dropdowns/dropdownFakultas";
import PaginationElement from "@/components/elements/paginationElement";
import prodi from "@/components/prodi";
import { Input } from "@/components/ui/input";
import Modal from "@/components/elements/modals/modal";
import ModalWarning from "@/components/elements/modals/modalWarning";
import axiosClient from "@/config/axios";
import ImageCard from "@/components/elements/imageCard";

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
	const [isClear, setIsClear] = React.useState<boolean>(false);
	const [allUrls, setAllurls] = React.useState<string[]>([]);

	React.useEffect(() => {
		const foundItem = prodi.find((item: any) => item.kode === kodeProdi);
		foundItem ? setFakultas(`${foundItem.jenjang} - ${foundItem.nama_prodi}`) : setFakultas("");
	}, [kodeProdi]);

	React.useEffect(() => {
		setIsValue(`${angkatan} / ${fakultas}`);
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

	return (
		<>
			<span className="flex flex-col gap-10 text-center w-full items-center justify-center">
				<h1 className="font-bold text-4xl">Cari Foto Mahasiswa</h1>
				<span className="grid gap-5">
					<div className="flex w-full items-end space-x-2 justify-center">
						<Input type="text" className="max-w-lg" readOnly value={isValue} />
						<Modal
							title="Cari"
							dialogTitle="apakah anda yakin ingin mencari data ini?"
							description="anda tidak bisa mengembalikan data yang sudah di cari"
							handleConfirm={handleSearch}
						/>
					</div>
					<div className="flex w-full items-end space-x-2 justify-center">
						<DropdownAngkatan title="Angkatan" value={yearsArray} setIsValue={setAngkatan} />
						<DropdownFakultas title="Prodi" value={prodi} setIsValue={setKodeProdi} />
						<Input
							type="number"
							className="max-w-32"
							placeholder="nim mulai"
							onChange={(e: any) => setNimStart(e.target.value)}
							required
						/>
						<Input
							type="number"
							className="max-w-32"
							placeholder="nim berhenti"
							onChange={(e: any) => setNimEnd(e.target.value)}
							required
						/>
					</div>
				</span>
			</span>
			{isClear && (
				<ModalWarning
					isOpen={isClear}
					setIsOpen={setIsClear}
					dialogTitle="Peringatan"
					description="NIM tidak boleh kosong"
				/>
			)}

			<div className="col-span-8 text-center text-2xl font-semibold border w-[90vw] bg-gray-100 rounded-lg flex items-center justify-center min-h-[63vh] p-5">
				{isLoading ? (
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
				) : allUrls.length === 0 ? (
					<h1>Data tidak ditemukan</h1>
				) : (
					<div className="flex flex-wrap w-full gap-5 items-center justify-center">
						{allUrls?.map((url: string, index: number) => (
							<ImageCard key={index} img_url={url} />
						))}
					</div>
				)}
			</div>
			<PaginationElement />
		</>
	);
};

export default HomeViews;
