import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.2 4.6c-1.3-1.3-3.1-2.1-5-2.1-3.9 0-7 3.1-7 7s3.1 7 7 7c1.9 0 3.7-.8 5-2.1" />
      <path d="M15.2 19.4c-1.3 1.3-3.1 2.1-5 2.1-3.9 0-7-3.1-7-7s3.1-7 7-7c1.9 0 3.7.8 5 2.1" />
      <path d="M9 12h12" />
    </svg>
  );
}
