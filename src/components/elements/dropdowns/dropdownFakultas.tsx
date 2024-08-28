"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type typePropsDropDown = {
	title: string;
	value: {
		id: string;
		id_fakultas: string;
		jenjang: string;
		kode: string;
		nama_prodi: string;
		status: string;
	}[];
	setIsValue: any;
};

const DropdownFakultas = (props: typePropsDropDown) => {
	const { title, value, setIsValue } = props;

	const [position, setPosition] = React.useState<string>(`${value[0].kode}`);

	React.useEffect(() => {
		setIsValue(position);
	}, [position]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">{title}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>Pilih {title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
					{value.map((item, index: number) => (
						<DropdownMenuRadioItem key={index} value={item.kode}>
							{item.nama_prodi}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownFakultas;
