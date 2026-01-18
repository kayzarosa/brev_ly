import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { UnregisteredLinks } from "./unregistered-links";
import { Loading } from "./loading";
import { CardLink } from "./card-link";
import { useDeleteLink, useGetListLinks, useReportLink } from "@/store/links";

export function MyLinks() {
	const { data: myLinksRegistered, isFetching: isLoadingLinks } =
		useGetListLinks();

	const { mutate: deleteLink } = useDeleteLink();

	const { mutateAsync: downloadReport, isPending: isPendingDownloadReport } =
		useReportLink();

	const handleCopyClipboard = (link: string) => {
		navigator.clipboard.writeText(link);
	};

	const handleDeleteLink = (id: string) => {
		deleteLink(id);
	};

	const handleDownloadReport = async () => {
		await downloadReport();
	};

	return (
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

			{myLinksRegistered && myLinksRegistered.total > 0 && !isLoadingLinks && (
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
		</div>
	);
}
