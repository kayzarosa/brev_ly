import { Copy, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export type Link = {
  id: string;
  linkOriginal: string;
  linkShortened: string;
  numberOfAccesses: number;
};

export function CardLink({ id, linkOriginal, linkShortened, numberOfAccesses }: Link) {
  return (
    <div
      key={id}
      className="flex flex-row p-4 mb-4 border-t-2 border-gray-200 text-semibold text-md"
    >
      <div className="w-[50%] flex flex-col gap-1">
        <Link
          to={`/${linkShortened}`}
          className="text-blue-base cursor-pointer"
        >
          brev.ly/{linkShortened}
        </Link>
        <p className="text-gray-500 text-[12px] truncate w-full leading-4.5">
          {linkOriginal}
        </p>
      </div>
      <div className="w-[50%] h-full flex flex-row justify-end items-center gap-5">
        <p className="text-gray-500 text-[12px] text-y-center text-right">
          {numberOfAccesses} acessos
        </p>
        <div className="flex flex-row gap-1">
          <Button variant="secondary" size="icon-sm">
            <Copy size={16} />
          </Button>

          <Button variant="secondary" size="icon-sm">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
