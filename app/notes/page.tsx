import NotesClient from "./Notes.client";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

export default async function Notes({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // 1. Створення нового екземпляра QueryClient для цього запиту
  const queryClient = new QueryClient();

  // 2. Попередня вибірка даних (prefetch) на сервері
  // Результат зберігається в кеші queryClient
  await queryClient.prefetchQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
  });

  // 3. Отримання стану кеша для передачі на клієнт
  const dehydratedState = dehydrate(queryClient);

  return <NotesClient dehydratedState={dehydratedState} />;
}
