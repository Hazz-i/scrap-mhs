import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type AlertDialogProps = {
	title: string;
	dialogTitle: string;
	description: string;
	handleConfirm: () => void;
	isLoading: boolean;
};

const Modal = (props: AlertDialogProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="w-full lg:w-auto" disabled={props.isLoading}>
					{props.title}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{props.dialogTitle}</AlertDialogTitle>
					<AlertDialogDescription>{props.description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Batalkan</AlertDialogCancel>
					<AlertDialogAction onClick={props.handleConfirm}>Mengerti</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default Modal;
