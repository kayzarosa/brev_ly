import { Loading } from "@/components/loading";

export function LoadingPage() {
  return (
    <div className="flex justify-center items-center">
      <Loading text="Carregando..." />
    </div>
  )
}