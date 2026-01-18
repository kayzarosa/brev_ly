import { TriangleAlert } from "lucide-react";
import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
	base: "flex-1 w-full bg-transparent border-none outline-none focus:ring-0 focus:outline-none text-gray-400 text-md font-semibold h-4.5 py-4",

	variants: {
		variantInput: {
			primary: "px-3.5",
			secondary: "px-0",
		},
	},

	defaultVariants: {
		variantInput: "primary",
	},
});

const labelErrorOrStandard = tv({
	base: "mb-2  text-xs leading-3.5 uppercase transition-colors",

	variants: {
		hasError: {
			true: "text-danger group-focus-within:text-danger",
			false: "text-gray-500 group-focus-within:text-blue-base",
		},
	},
	defaultVariants: {
		hasError: false,
	},
});

const imputErrorOrStandard = tv({
	base: "flex justify-center items-center h-12 w-full border-2 rounded-lg transition-colors",

	variants: {
		hasError: {
			true: "border-danger focus-within:border-danger",
			false: "border-gray-300 focus-within:border-blue-base",
		},
	},
	defaultVariants: {
		hasError: false,
	},
});

type InputProps = ComponentProps<"input"> &
	VariantProps<typeof inputVariants> & {
		textLabel: string;
		textSpan?: string;
		error?: FieldError | null;
	};

export function Input({
	variantInput,
	id,
	textLabel,
	textSpan,
	className,
	error,
	...props
}: InputProps) {
	return (
		<div className="group flex flex-col">
			<label
				htmlFor={id}
				className={labelErrorOrStandard({ hasError: !!error })}
			>
				{textLabel}
			</label>
			<div className={imputErrorOrStandard({ hasError: !!error })}>
				{!!textSpan && (
					<span className="ml-4 text-gray-600 leading-4.5 text-md gap-0">
						{textSpan}
					</span>
				)}
				<input
					id={id}
					{...props}
					className={inputVariants({ variantInput, className })}
				/>
			</div>

			{!!error && (
				<div className="flex flex-row items-center w-full gap-2 mt-2 [&>svg]:text-danger">
					<TriangleAlert size={14} />
					<span className="text-gray-500 text-sm">{error.message}</span>
				</div>
			)}
		</div>
	);
}
