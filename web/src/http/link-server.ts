import type { GetListLinks, AddLink, GetLink } from "@/types/link-types";

export async function addLink(data: AddLink): Promise<{ id: string }> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/link/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || "Falha ao adicionar o link");
  }

  return response.json();
}

export async function getLinks(): Promise<GetListLinks> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/link/list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar os links");
  }

  return response.json();
}

export async function deleteLink(id: string): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/link?idLink=${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao deletar o link");
  }

  return;
}

export async function getLinkReport(): Promise<{ reportUrl: string }> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/link/report`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar os links");
  }

  return response.json();
}

export async function getLinkValidate(
  shortenedUrl: string,
): Promise<{ valid: boolean }> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/link/validate?shortened=${shortenedUrl}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar o link");
  }

  return response.json();
}

export async function getIncrementNumberOfAccesses(
  idLink: string,
): Promise<{ id: string; numberOfAccesses: number }> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/link/increment?idLink=${idLink}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar o link");
  }

  return response.json();
}
