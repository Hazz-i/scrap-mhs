import { Card } from "../ui/card";
import * as React from "react";

type imageCardProps = {
	img_url: string;
	className?: string;
};

const ImageCard = (props: imageCardProps) => {
	const { className = "w-[130px] h-[175px] lg:w-[150px] lg:h-[200px]" } = props;
	return (
		<Card
			className={
				"transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:cursor-pointer bg-cover bg-center overflow-hidden " +
				className
			}
			style={{
				backgroundImage: `url(${props.img_url})`,
			}}>
			<div className="hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 md:flex flex-col justify-end p-3">
				<ul className="text-white text-xs space-y-1">
					<li className="flex items-center justify-center w-full">
						<span>{props.img_url.split("/")[4].split("_").join(".").split(".jpg")}</span>
					</li>
				</ul>
			</div>
		</Card>
	);
};

export default ImageCard;
