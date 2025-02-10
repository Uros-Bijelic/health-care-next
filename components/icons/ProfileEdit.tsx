import type { SVGProps } from 'react';

// ----------------------------------------------------------------

const ProfileEditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-user-pen"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M11.5 15H7a4 4 0 0 0-4 4v2M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
    <circle cx={10} cy={7} r={4} />
  </svg>
);
export default ProfileEditIcon;
