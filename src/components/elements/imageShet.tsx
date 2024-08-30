import { Button } from "@/components/ui/button";
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
import ImageCard from "./imageCard";

export default function ImageShet(props: { img_url: string; data: string }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="relative group">
					<ImageCard img_url={props.img_url} />
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Mahasiswa Universitas Amikom</SheetTitle>
					<SheetDescription>Prodi {props.data}</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<div className="flex items-center justify-center flex-col gap-5 py-4">
						<ImageCard
							img_url={props.img_url}
							className="w-[130px] h-[175px] lg:w-[250px] lg:h-[300px] -z-10"
						/>
						<h1>{props.img_url.split("/")[4].split("_").join(".").split(".jpg")}</h1>
					</div>
				</div>
				<SheetFooter>
					<SheetClose asChild className="w-full">
						<a
							href={props.img_url}
							download={props.img_url.split("/")[4].split("_").join(".").split(".jpg")}>
							<Button type="button" className="w-full">
								Download Foto
							</Button>
						</a>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
