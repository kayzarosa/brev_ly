import imgError from "@/assets/code-erros/404.svg";

export function LinkNotFound() {
	return (
		<div className="md:w-145 w-[calc(100vw-16px)] h-82.25 bg-gray-100 rounded-lg">
			<div className="w-full h-full flex flex-col justify-center items-center">
				<img
					src={imgError}
					alt="Página não encontra"
					className="w-41 md:w-48.5 h-18 md:h-21.25"
				/>

				<h1 className="text-gray-600 mt-6 font-bold leading-8 text-2xl">
					Link não encontrado
				</h1>

				<span className="text-center text-gray-500 text-md leading-4.5 font-semibold mt-6">
					O link que você está tentando acessar não existe, foi removido ou é
					uma URL inválida. Saiba mais em
					<a
						href={import.meta.env.VITE_FRONTEND_URL}
						className="text-blue-base decoration-blue-base underline"
					>
						{" "}
						brev.ly
					</a>
					.
				</span>
			</div>
		</div>
	);
}
