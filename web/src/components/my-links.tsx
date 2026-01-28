import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import {
	queryClient,
	useDeleteLink,
	useGetListLinks,
	useReportLink,
} from "@/store/links-query";
import { CardLink } from "./card-link";
import { Loading } from "./loading";
import { Button } from "./ui/button";
import { ModalDialogConfirm } from "./ui/modal-dialog-confirm";
import { NotificationToast } from "./ui/notification-toast";
import { UnregisteredLinks } from "./unregistered-links";

export function MyLinks() {
	const [openModal, setOpenModal] = useState(false);
	const [descriptionModal, setDescriptionModal] = useState("");
	const [idDeleteLink, setIdDeleteLink] = useState("");

	const [open, setOpen] = useState(false);
	const [variantToast, setVariantToast] = useState<"success" | "error">(
		"success",
	);
	const [toastDescription, setToastDescription] = useState("");

	const { data: myLinksRegistered, isFetching: isLoadingLinks } =
		useGetListLinks();

	const { mutate: deleteLink } = useDeleteLink();

	const { mutateAsync: downloadReport, isPending: isPendingDownloadReport } =
		useReportLink();

	const handleCopyClipboard = (link: string) => {
		navigator.clipboard.writeText(link);
	};

	const handleDeleteLink = (id: string, link: string) => {
		setDescriptionModal(`Tem certeza que deseja excluir este link: ${link} ?`);
		setIdDeleteLink(id);
		setOpenModal(true);
	};

	const handleConfirmDeleteLink = () => {
		deleteLink(idDeleteLink, {
			onSuccess: () => {
				setVariantToast("success");
				setToastDescription("Link deletado com sucesso");
				setOpen(true);
			},
			onError: (error) => {
				setVariantToast("error");
				setToastDescription(error?.message || "Erro ao deletar o link");
				setOpen(true);
			},
		});
		setIdDeleteLink;
		setOpenModal(false);
	};

	const handleDownloadReport = async () => {
		await downloadReport();
	};

	useEffect(() => {
		const channel = new BroadcastChannel("list-links");

		channel.onmessage = (event) => {
			if (event.data === "refresh_list") {
				queryClient.invalidateQueries({ queryKey: ["list-links"] });
			}
		};

		return () => channel.close();
	}, []);

	return (
		<>
			<div className="flex flex-col p-6 md:p-8">
				<div className="flex flex-row w-full items-center justify-between mb-5">
					<h1 className="text-gray-600 text-lg leading-8 font-bold">
						Meus links
					</h1>

					<div className="w-25 h-8">
						<Button
							variant="secondary"
							size="icon"
							onClick={handleDownloadReport}
							disabled={isPendingDownloadReport}
						>
							<Download size={14} />
							{isPendingDownloadReport ? "Baixando..." : "Baixar CSV"}
						</Button>
					</div>
				</div>

				{myLinksRegistered && myLinksRegistered.total <= 0 && (
					<UnregisteredLinks />
				)}

				{isLoadingLinks && (
					<>
						<hr className="my-5 border-t-2 border-gray-200" />
						<br />
						<Loading text="Carregando links..." />
					</>
				)}

				{myLinksRegistered &&
					myLinksRegistered.total > 0 &&
					!isLoadingLinks && (
						<div className="flex flex-col mt-5 overflow-y-scroll max-h-65 md:max-h-96 custom-scrollbar">
							{myLinksRegistered.links.map((link) => (
								<CardLink
									key={link.id}
									id={link.id}
									linkOriginal={link.linkOriginal}
									linkShortened={link.linkShortened}
									numberOfAccesses={link.numberOfAccesses}
									copyLink={handleCopyClipboard}
									deleteLink={handleDeleteLink}
								/>
							))}
						</div>
					)}

				<footer>
					<p className="text-gray-600 text-md text-right mr-6 font-semibold">
						Total de links: {myLinksRegistered?.total}
					</p>
				</footer>
			</div>

			<ModalDialogConfirm
				open={openModal}
				title="Confirmação de exclusão"
				description={descriptionModal}
				openChange={setOpenModal}
				onConfirm={() => handleConfirmDeleteLink()}
			/>

			<NotificationToast
				open={open}
				setOpen={setOpen}
				variantToast={variantToast}
				description={toastDescription}
			/>
		</>
	);
}
