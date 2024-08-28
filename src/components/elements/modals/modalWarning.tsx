import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AlertDialogProps = {
	dialogTitle: string;
	description: string;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

const ModalWarning = (props: AlertDialogProps) => {
	return (
		<AlertDialog open={props.isOpen} onOpenChange={props.setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{props.dialogTitle}</AlertDialogTitle>
					<AlertDialogDescription>{props.description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ModalWarning;
