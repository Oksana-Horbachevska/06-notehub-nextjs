import NotesClient from "./Notes.client";

import { fetchNotes } from "@/lib/api";

export default async function Notes({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { notes, totalPages } = await fetchNotes(query, currentPage);

  const initialData = {
    notes: notes,
    totalPages: totalPages,
  };

  return (
    <NotesClient
      initialData={initialData}
      initialQuery={query}
      initialPage={currentPage}
    />
  );
}
