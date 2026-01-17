import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { UnregisteredLinks } from "./unregistered-links";
import { Loading } from "./loading";
import { CardLink, type Link } from "./card-link";

type LinkRegistered = {
  links: Link[];
  total: number;
};

export function MyLinks() {
  const myLinksRegistered: LinkRegistered = {
    links: [
      {
        id: "1",
        linkOriginal:
          "https://example.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-0k",
        numberOfAccesses: 42,
      },
      {
        id: "2",
        linkOriginal:
          "https://anotherexample.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-1a",
        numberOfAccesses: 27,
      },
      {
        id: "3",
        linkOriginal:
          "https://yetanotherexample.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-2b",
        numberOfAccesses: 15,
      },
      {
        id: "4",
        linkOriginal:
          "https://moreexamples.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-3c",
        numberOfAccesses: 8,
      },
      {
        id: "5",
        linkOriginal:
          "https://finalexample.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-4d",
        numberOfAccesses: 3,
      },
      {
        id: "6",
        linkOriginal:
          "https://lastexample.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-5e",
        numberOfAccesses: 1,
      },
      {
        id: "7",
        linkOriginal:
          "https://onemoreexample.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-6f",
        numberOfAccesses: 0,
      },
      {
        id: "8",
        linkOriginal:
          "https://additionalexample.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-7g",
        numberOfAccesses: 0,
      },
      {
        id: "9",
        linkOriginal:
          "https://nextexample.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-8h",
        numberOfAccesses: 0,
      },
      {
        id: "10",
        linkOriginal:
          "https://finalexampleagain.com/udiaiooisisi/dfsaf/s/f/sf/ds/fsA?Df/sf//asf",
        linkShortened: "short-9i",
        numberOfAccesses: 0,
      }
    ],
    total: 10,
  };
  const isLoading = false;

  return (
    <div className="flex flex-col p-6 md:p-8">
      <div className="flex flex-row w-full items-center justify-between mb-5">
        <h1 className="text-gray-600 text-lg leading-8 font-bold">
          Meus links
        </h1>

        <div className="w-25 h-8">
          <Button variant="secondary" size="icon">
            <Download size={14} />
            Baixar CSV
          </Button>
        </div>
      </div>

      {myLinksRegistered.total <= 0 && <UnregisteredLinks />}

      {isLoading && (
        <>
          <hr className="my-5 border-t-2 border-gray-200" />
          <br />
          <Loading text="Carregando links..." />
        </>
      )}

      {myLinksRegistered.total > 0 && !isLoading && (
        <div className="flex flex-col mt-5 overflow-y-scroll max-h-65 md:max-h-96 custom-scrollbar">
          {myLinksRegistered.links.map((link) => (
            <CardLink
              key={link.id}
              id={link.id}
              linkOriginal={link.linkOriginal}
              linkShortened={link.linkShortened}
              numberOfAccesses={link.numberOfAccesses}
            />
          ))}
        </div>
      )}
    </div>
  );
}
