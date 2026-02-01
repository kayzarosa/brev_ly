import * as Toast from "@radix-ui/react-toast";
import { Ban, Check, Info, X } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const toastRootVariants = tv({
	base: "rounded-2xl shadow-lg border-2 p-4 relative overflow-hidden mt-14 md:mt-3 wrap-break-word leading-relaxed max-w-60",
	variants: {
		variantToast: {
			success: "border-green-500 bg-emerald-500/10",
			error: "border-red-500  bg-red-500/10 opacity-90 ",
			info: "border-blue-500/20 bg-blue-500/10 shadow-blue-500/5",
		},
	},
	defaultVariants: {
		variantToast: "info",
	},
});

const titleLayoutVariants = tv({
	base: "text-md font-bold flex flex-row gap-2 items-center",
	variants: {
		variantToastText: {
			success: "text-green-600",
			error: "text-red-600",
			info: "text-blue-600",
		},
	},
	defaultVariants: {
		variantToastText: "info",
	},
});

type NotificationToastProps = ComponentPropsWithoutRef<typeof Toast.Root> &
	VariantProps<typeof toastRootVariants> & {
		description?: string;
		open: boolean;
		setOpen: (open: boolean) => void;
	};

export function NotificationToast({
	description,
	open,
	setOpen,
	variantToast,
	className,
}: NotificationToastProps) {
	return (
		<Toast.Root
			className={toastRootVariants({ variantToast, className })}
			open={open}
			onOpenChange={setOpen}
		>
			<Toast.Title
				className={titleLayoutVariants({ variantToastText: variantToast })}
			>
				{variantToast === "success" ? (
					<>
						<Check width={14} />
						Sucesso
					</>
				) : variantToast === "error" ? (
					<>
						<Ban width={14} />
						Error
					</>
				) : (
					<>
						<Info width={14} /> Info
					</>
				)}
			</Toast.Title>
			{description && (
				<Toast.Description className="text-xxs mt-2 text-gray-600">
					{description}
				</Toast.Description>
			)}

			<Toast.Close className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
				<X size={16} />
			</Toast.Close>
		</Toast.Root>
	);
}
