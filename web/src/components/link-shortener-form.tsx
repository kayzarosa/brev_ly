import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAddLink } from "@/store/links";
import { useState } from "react";
import { NotificationToast } from "./ui/notification-toast";

type IFormInput = {
	link: string;
	linkShortener: string;
};

const linkSchema = z.object({
	link: z
		.string()
		.min(3, "O link original é obrigatório")
		.regex(
			/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
			"Insira um endereço de site válido",
		),
	linkShortener: z
		.string()
		.min(1, "O link curto é obrigatório")
		.max(100, "O link curto deve ter menos que 100 caracteres")
		.regex(/^[a-z0-9-]+$/, "Use apenas letras minusculas, números e hífens"),
});

export function LinkShortenerForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<IFormInput>({
		resolver: zodResolver(linkSchema),
	});

	const [open, setOpen] = useState(false);
	const [variantToast, setVariantToast] = useState<"success" | "error">("success");
	const [toastDescription, setToastDescription] = useState("");

	const { mutate: addLink, isPending: isPendingAddLink } = useAddLink();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));

		addLink(
			{
				linkOriginal: data.link,
				linkShortened: data.linkShortener,
			},
			{
				onSuccess: () => {
					reset();
					setVariantToast("success");
					setToastDescription("Link adicionado com sucesso");
					setOpen(true);
				},
				onError: (error) => {
					setVariantToast("error");
					setToastDescription(error?.message || "Erro ao adicionar o link");
					setOpen(true);
				},
			},
		);
	};

	return (
		<div className="flex flex-col p-8">
			<h1 className="text-gray-600 text-lg leading-8 font-bold mb-5">
				Novo link
			</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<Input
					id="link"
					type="text"
					{...register("link")}
					textLabel="Link original"
					variantInput="primary"
					error={errors.link}
					placeholder="www.exemplo.com.br"
				/>

				<Input
					id="linkShortener"
					{...register("linkShortener")}
					textLabel="Link encurtado"
					variantInput="secondary"
					error={errors.linkShortener}
					placeholder="exemplo-1"
					textSpan="brev.ly/"
				/>

				<Button
					disabled={isPendingAddLink || isSubmitting}
					className="mt-4"
					variant="primary"
				>
					{isPendingAddLink || isSubmitting ? "Salvando..." : "Salvar link"}
				</Button>
			</form>

			<NotificationToast
				open={open}
				setOpen={setOpen}
				variantToast={variantToast}
				description={toastDescription}
			/>
		</div>
	);
}
