import { LinkShortenerForm } from "./link-shortener-form";

export function LinkShortener() {
  return (
    <div className="w-full max-w-[calc(100vw-26.8vw)] h-full max-md:max-w-[calc(100vw-1.66vw)]">
      <header className="flex mt-22 mb-8 max-md:justify-center max-md:mt-8">
        <img src="logo.svg" width="96.67px" height="24.29px" alt="Brev.ly" />
      </header>

      <div className="flex w-full flex-col gap-3 md:flex-row md:gap-5">
        <div className="w-[45%] bg-gray-100 p-4 rounded-3xl max-md:w-full">
          <LinkShortenerForm />
        </div>

        <div className="w-[55%] h-fit bg-gray-100 p-4 rounded-3xl max-md:w-full">55%</div>
      </div>
    </div>
  );
}
