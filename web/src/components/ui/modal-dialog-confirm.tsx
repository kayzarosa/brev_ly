import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AnimatePresence, motion } from "motion/react";

type ModalDialogConfirmProps = {
	open: boolean;
	title: string;
	description: string;
	openChange: (open: boolean) => void;
	onConfirm: () => void;
};

export function ModalDialogConfirm({
	open,
	title,
	description,
	openChange,
	onConfirm,
}: ModalDialogConfirmProps) {
	return (
		<AlertDialog.Root open={open} onOpenChange={openChange}>
			<AlertDialog.Trigger />
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed z-998 inset-0 bg-black/50 animate-overlay-show" />
				<AlertDialog.Content
					onOpenAutoFocus={(event) => {
						event.preventDefault();
					}}
				>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, x: "-50%", y: "-48%", scale: 0.95 }}
							animate={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
							exit={{ opacity: 0, x: "-50%", y: "-48%", scale: 0.95 }}
							transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
							className="fixed top-1/2 left-1/2 z-999 bg-white rounded-xl 
                shadow-2xl w-[90vw] max-w-125 max-h-[85vh] p-6 focus:outline-none border
                border-gray-100"
						>
							<AlertDialog.Title className="text-lg font-bold mb-4">
								{title}
							</AlertDialog.Title>
							<AlertDialog.Description className="text-sm text-gray-600 mb-6">
								{description}
							</AlertDialog.Description>
							<div className="flex gap-14 justify-end">
								<AlertDialog.Cancel asChild autoFocus>
									<p className="text-ls text-danger font-bold hover:underline cursor-pointer hover:text-red-600">
										Cancelar
									</p>
								</AlertDialog.Cancel>
								<AlertDialog.Action asChild>
									<p
										className="text-ls text-blue-base font-bold hover:underline cursor-pointer hover:text-blue-600"
										onClick={onConfirm}
									>
										Sim
									</p>
								</AlertDialog.Action>
							</div>
						</motion.div>
					</AnimatePresence>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}
