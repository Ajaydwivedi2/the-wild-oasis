import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: () => {
      toast.success(`Booking successfully checked out`);
      queryClient.invalidateQueries({ active: true }); // invalidates all the queries of this page immideately after the fetching. No need to specify the single query name.
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
