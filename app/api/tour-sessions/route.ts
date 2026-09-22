import { query } from "@/lib/commerce/db";
import { paymentReady } from "@/lib/commerce/config";
import { errorResponse, privateJson } from "@/lib/commerce/http";
import { getTour } from "@/lib/tours";
export async function GET(request: Request) {
  const tourId = new URL(request.url).searchParams.get("tourId") || "";
  if (!getTour(tourId) || !paymentReady())
    return privateJson({ enabled: false, sessions: [] });
  try {
    const sessions = await query(
      `SELECT s.id,s.starts_at,s.capacity,s.min_people,s.adult_price,s.child_price,s.status,
      greatest(s.capacity-coalesce(sum(CASE WHEN b.status IN ('confirming','paid','cancel_requested','refund_pending') OR (b.status='pending' AND b.expires_at>now()) THEN b.adult_count+b.child_count ELSE 0 END),0),0)::int AS remaining
      FROM gj_sessions s LEFT JOIN gj_bookings b ON b.session_id=s.id WHERE s.tour_id=$1 AND s.starts_at>now() AND s.status IN ('open','confirmed')
      GROUP BY s.id ORDER BY s.starts_at LIMIT 180`,
      [tourId],
    );
    return privateJson({ enabled: true, sessions });
  } catch (error) {
    return errorResponse(error);
  }
}
