import { brand } from "@/lib/brand";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-lockup">
      <svg
        className="brand-symbol"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="11" fill="currentColor" />
        <path
          d="M10 24V12h5l6 12h5V12"
          stroke="white"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 12v12m6-12v12"
          stroke="white"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
      {!compact && (
        <span>
          {brand.name}
          <span className="brand-dot">.</span>
        </span>
      )}
    </span>
  );
}
