import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addLink,
  deleteLink,
  getLinkReport,
  getLinks,
  type AddLink,
} from "@/http/link-server";
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
  const queryClient = useQueryClient();

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
  const queryClient = useQueryClient();

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
