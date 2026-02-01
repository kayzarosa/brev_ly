import {
  getIncrementNumberOfAccesses,
  getLinkValidate,
} from "@/http/link-server";
import { channel } from "@/utils/chanel";
import { redirect } from "react-router-dom";

export async function validateLinkMiddleware(urlShortened?: string) {
  if (!urlShortened) {
    return redirect("*");
  }

  try {
    const link = await getLinkValidate(urlShortened);

    if (!link.id) {
      channel({
        nameChannel: "list-links",
        eventChannel: "refresh_list",
      });
      return redirect("*");
    }

    await getIncrementNumberOfAccesses(link.id);

    channel({
      nameChannel: "list-links",
      eventChannel: "refresh_list",
    });

    return link;
  } catch (error) {
    channel({
      nameChannel: "list-links",
      eventChannel: "refresh_list",
    });
    console.log(1)
    return redirect("*");
  }
}
