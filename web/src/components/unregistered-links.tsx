import { Link } from "lucide-react";

export function UnregisteredLinks() {
	return (
		<div
			className="flex flex-col items-center justify-center py-8 mt-5 
        border-t-2 border-gray-200"
		>
			<Link size={48} className="text-gray-400 mt-8 mb-3" />

			<p className="text-gray-500 text-center text-xs uppercase">
				Ainda não existem links cadastrados
			</p>
		</div>
	);
}
