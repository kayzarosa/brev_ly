import redirectImg from "@/assets/logo-icon.svg";
import type { GetLink } from "@/types/link-types";
import { getValidateUrl } from "@/utils/get-validate-url";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export function RedirectingLink() {
  const dataLink = useLoaderData() as GetLink;

  useEffect(() => {
    window.location.href = getValidateUrl(dataLink.linkOriginal);
  }, []);

  return (
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
            href={dataLink.linkOriginal}
            className="text-blue-base decoration-blue-base underline"
          >
            {" "}
            Acesse aqui
          </a>
        </span>
      </div>
    </div>
  );
}
