import { Link, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEYS, ROUTES } from "../../common";
import * as bookingService from "../../services/booking.service";
import BookingDetailContent from "../../components/bookings/BookingDetailContent";
import { isAdmin } from "../../utils/user";
import { useAuth } from "../../context/AuthContext";

export default function BookingDetailPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const admin = isAdmin(user);

  const bookingQuery = useQuery({
    queryKey: [CACHE_KEYS.BOOKINGS, bookingId],
    queryFn: () => bookingService.fetchBooking(bookingId!),
    enabled: Boolean(bookingId),
  });

  const approveMutation = useMutation({
    mutationFn: () => bookingService.approveBooking(bookingId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.BOOKINGS] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => bookingService.rejectBooking(bookingId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CACHE_KEYS.BOOKINGS] });
    },
  });

  if (!bookingId) {
    return <p className="text-error">Invalid booking.</p>;
  }

  if (bookingQuery.isLoading) {
    return <p className="text-on-surface-variant">Loading booking...</p>;
  }

  if (bookingQuery.isError || !bookingQuery.data) {
    return (
      <div>
        <p className="text-error">Could not load this booking.</p>
        <Link to={ROUTES.BOOKINGS} className="mt-4 inline-block text-primary">
          Back to calendar
        </Link>
      </div>
    );
  }

  const booking = bookingQuery.data;

  const adminActions =
    admin && booking.status === "pending" ? (
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={approveMutation.isPending}
          onClick={() => approveMutation.mutate()}
          className="rounded-full bg-primary px-5 py-2.5 text-sm text-on-primary disabled:opacity-60"
        >
          Approve
        </button>
        <button
          type="button"
          disabled={rejectMutation.isPending}
          onClick={() => rejectMutation.mutate()}
          className="rounded-full border border-error px-5 py-2.5 text-sm text-error disabled:opacity-60"
        >
          Reject
        </button>
      </div>
    ) : null;

  return (
    <BookingDetailContent
      booking={booking}
      adminActions={adminActions}
    />
  );
}
