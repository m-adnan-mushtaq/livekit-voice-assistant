import { api, unwrapApi } from "./api";
import type { Booking } from "../types/api";

type BookingsQuery = {
  start_date?: string;
  end_date?: string;
  upcoming_only?: boolean;
  status?: string;
};

export async function fetchBookings(params: BookingsQuery = {}) {
  return unwrapApi<Booking[]>(api.get("/bookings/", { params }));
}

export async function approveBooking(bookingId: string) {
  return unwrapApi<Booking>(api.post(`/bookings/${bookingId}/approve`));
}

export async function rejectBooking(bookingId: string, reason?: string) {
  return unwrapApi<Booking>(
    api.post(`/bookings/${bookingId}/reject`, { reason }),
  );
}
