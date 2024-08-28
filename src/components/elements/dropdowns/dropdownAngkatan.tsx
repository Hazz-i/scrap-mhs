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
	value: string[];
	setIsValue: any;
};

const DropdownAngkatan = (props: typePropsDropDown) => {
	const { title, value, setIsValue } = props;

	const [position, setPosition] = React.useState<string>(`${value[0]}`);

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
						<DropdownMenuRadioItem key={index} value={item}>
							{item}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownAngkatan;
