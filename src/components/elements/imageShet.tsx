import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Card } from "../ui/card";

export default function ImageShet(props: { img_url: string }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="relative group">
					<Card
						className="w-[130px] h-[175px] lg:w-[150px] lg:h-[200px] transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:cursor-pointer bg-cover bg-center overflow-hidden"
						style={{
							backgroundImage: `url(${props.img_url})`,
						}}>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
							<ul className="text-white text-xs space-y-1">
								<li className="flex items-center justify-center w-full">
									<span>{props.img_url.split("/")[4].split("_").join(".").split(".jpg")}</span>
								</li>
							</ul>
						</div>
					</Card>
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Mahasiswa Universitas Amikom</SheetTitle>
					<SheetDescription>Prodi informatika</SheetDescription>
				</SheetHeader>
				<div className="flex items-center justify-center flex-col gap-5 py-4">
					<Card
						className="w-[130px] h-[175px] lg:w-[250px] lg:h-[300px] transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:cursor-pointer bg-cover bg-center overflow-hidden"
						style={{
							backgroundImage: `url(${props.img_url})`,
						}}>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
							<ul className="text-white text-xs space-y-1">
								<li className="flex items-center justify-center w-full">
									<span>{props.img_url.split("/")[4].split("_").join(".").split(".jpg")}</span>
								</li>
							</ul>
						</div>
					</Card>
					<Table>
						<TableCaption>Harap Gunakan Data Dengan Benar.</TableCaption>
						<TableBody>
							<TableRow>
								<TableCell className="font-medium">NIM</TableCell>
								<TableCell className="font-medium">:</TableCell>
								<TableCell>
									{props.img_url.split("/")[4].split("_").join(".").split(".jpg")}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-medium">Nama</TableCell>
								<TableCell className="font-medium">:</TableCell>
								<TableCell>INI CONTOH NAMA</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Download</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
