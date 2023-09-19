import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAZE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filteredValue = searchParam.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue };

  // SORT BY
  const sortByRaw = searchParam.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGE
  const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"));

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PREFETCHING

  const pageCount = Math.ceil(count / PAZE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  return { isLoading, bookings, count };
}
