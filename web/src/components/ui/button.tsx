import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "font-semibold cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",

	variants: {
		variant: {
			primary:
				"w-full text-white text-sm bg-blue-base hover:bg-blue-dark hover:ring-0",
			secondary:
				"flex justify-center items-center w-full text-xs text-gray-500 bg-gray-200 hover:ring-inset hover:ring-blue-base hover:ring-2",
		},
		size: {
			default: "p-4",
			icon: "p-2 gap-2",
			"icon-sm": "p-2 max-w-8",
		},
	},

	defaultVariants: {
		variant: "primary",
		size: "default",
	},
});

type ButtonProps = ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

export function Button({
	variant,
	size,
	className,
	asChild,
	...props
}: ButtonProps) {
	const Component = asChild ? Slot : "button";

	return (
		<Component
			className={buttonVariants({ variant, size, className })}
			{...props}
		/>
	);
}
