import { Copy, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import type { GetLink } from "@/http/link-server";

type CardLinkProps = GetLink & {
	copyLink: (link: string) => void;
	deleteLink: (id: string) => void;
};

export function CardLink({
	id,
	linkOriginal,
	linkShortened,
	numberOfAccesses,
	copyLink,
	deleteLink,
}: CardLinkProps) {
	return (
		<div
			key={id}
			className="flex flex-row p-4 mb-4 border-t-2 border-gray-200 text-semibold text-md"
		>
			<div className="w-[50%] flex flex-col gap-1">
				<Link
					to={`/${linkShortened}`}
					className="text-blue-base cursor-pointer"
				>
					brev.ly/{linkShortened}
				</Link>
				<p className="text-gray-500 text-[12px] truncate w-full leading-4.5">
					{linkOriginal}
				</p>
			</div>
			<div className="w-[50%] h-full flex flex-row justify-end items-center gap-5">
				<p className="text-gray-500 text-[12px] text-y-center text-right">
					{numberOfAccesses} acessos
				</p>
				<div className="flex flex-row gap-1">
					<Button
						variant="secondary"
						size="icon-sm"
						onClick={() =>
							copyLink(`${import.meta.env.VITE_FRONTEND_URL}/${linkShortened}`)
						}
					>
						<Copy size={16} />
					</Button>

					<Button
						variant="secondary"
						size="icon-sm"
						onClick={() => deleteLink(id)}
					>
						<Trash2 size={16} />
					</Button>
				</div>
			</div>
		</div>
	);
}
