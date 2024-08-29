import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ImagePropoverProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const ImagePropover = (props: ImagePropoverProps) => {
	return (
		<Popover>
			<PopoverTrigger>Open</PopoverTrigger>
			<PopoverContent>Place content for the popover here.</PopoverContent>
		</Popover>
	);
};

export default ImagePropover;
