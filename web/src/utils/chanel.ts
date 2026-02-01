import { queryClient } from "@/store/links-query";

type CreateChannel = {
  nameChannel: string;
  eventChannel: string;
  nameQuery: string;
};

type FinishChannel = {
  nameChannel: string;
  eventChannel: string;
};

export function createChannel({
  nameChannel,
  eventChannel,
  nameQuery,
}: CreateChannel) {
  const channel = new BroadcastChannel(nameChannel);

  channel.onmessage = (event) => {
    if (event.data === eventChannel) {
      queryClient.invalidateQueries({ queryKey: [nameQuery] });
    }
  };

  return () => channel.close();
}

export function channel({ eventChannel, nameChannel }: FinishChannel) {
  const channel = new BroadcastChannel(nameChannel);
  channel.postMessage(eventChannel);
  channel.close();
}
