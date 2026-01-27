import redirectImg from "@/assets/logo-icon.svg";
import {
  useGetListLinks,
  useIncrementAccesses,
  useValidateLink,
} from "@/store/links-query";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function RedirectingLink() {
  const navigate = useNavigate();
  const { urlShortened } = useParams();
  const { data: listLink } = useGetListLinks();
  const { mutate: increment } = useIncrementAccesses();
  const { mutate: validateLink, isPending } = useValidateLink();
  const hasRedirected = useRef(false);
  const urlRef = useRef("");

  function channel() {
    const channel = new BroadcastChannel("list-links");
    channel.postMessage("refresh_list");
    channel.close();
  }

  function getValidUrl(url: string) {
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return `https://${url}`;
  };

  function redirectSite(url: string) {
    if (hasRedirected.current) return;
    hasRedirected.current = true;

    channel();

    window.location.href = getValidUrl(url);
  }

  useEffect(() => {
    if (!urlShortened) {
      navigate("*");
      return;
    }

    validateLink(urlShortened, {
      onSuccess: () => {
        if (!!listLink && listLink.total <= 0) {
          return;
        }

        const link = listLink?.links.find(
          (link) => link.linkShortened === urlShortened,
        );

        if (link) {
          urlRef.current = link.linkOriginal;

          increment(link.id, {
            onSuccess: () => {
              redirectSite(link.linkOriginal);
            },
          });
        } else {
          navigate("*");
        }
      },
      onError: () => {
        channel();
        navigate("*");
      },
    });
  }, [listLink, urlShortened]);

  return (
    !isPending && (
      <div className="md:w-145 w-[calc(100vw-16px)] h-82.25 bg-gray-100 rounded-lg">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            src={redirectImg}
            alt="Redirecionando página"
            className="w-41 md:w-48.5 h-18 md:h-21.25"
          />

          <h1 className="text-gray-600 mt-6 font-bold leading-8 text-2xl">
            Redirecionando...
          </h1>

          <span className="text-center text-gray-500 text-md leading-4.5 font-semibold mt-6">
            O link será aberto automaticamente em alguns instantes.
            <br />
            Não foi redirecionado?
            <a
              href={urlRef.current}
              className="text-blue-base decoration-blue-base underline"
            >
              {" "}
              Acesse aqui
            </a>
          </span>
        </div>
      </div>
    )
  );
}
