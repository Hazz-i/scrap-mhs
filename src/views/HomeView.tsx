import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomeViews = () => {
	return (
		<>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input type="number" />
				<Button type="submit">Cari</Button>
			</div>
			<div className="grid col-7">
				<span className="w-48 h-48 rounded-lg overflow-hidden bg-black">
					<img src={`.`} alt="" />/
				</span>
			</div>
		</>
	);
};

export default HomeViews;
