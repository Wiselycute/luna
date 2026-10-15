import { Icon } from "./Icon";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#E8A33D]" role="img" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={size} filled={i <= Math.round(rating)} />)}
    </span>
  );
}
