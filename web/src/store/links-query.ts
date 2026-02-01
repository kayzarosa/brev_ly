import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
	addLink,
	deleteLink,
	getLinkReport,
	getLinks,
} from "@/http/link-server";
import type { AddLink } from "@/types/link-types";
import { downloadUrl } from "@/utils/download-url";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			refetchOnWindowFocus: false,
		},
	},
});

export function useAddLink() {
	return useMutation({
		mutationFn: ({ linkOriginal, linkShortened }: AddLink) =>
			addLink({ linkOriginal, linkShortened }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["list-links"] });
		},
	});
}

export function useGetListLinks() {
	return useQuery({
		queryKey: ["list-links"],
		queryFn: async () => getLinks(),
	});
}

export function useDeleteLink() {
	return useMutation({
		mutationFn: (id: string) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["list-links"] });
		},
	});
}

export function useReportLink() {
	return useMutation({
		mutationFn: () => getLinkReport(),
		onSuccess(data) {
			downloadUrl(data.reportUrl);
		},
	});
}

