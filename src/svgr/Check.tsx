import * as React from "react";
import { SVGProps } from "react";

export const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 16"
    {...props}
  >
    <path
      d="M6.297 12.398 1.6 7.091 0 8.886l3.148 3.557L6.811 16S15.479 3.733 17.337 2.133C19.194.533 16.56 0 16.56 0L6.297 12.398Z"
      fill="var(--cds-ui-bg)"
      stroke-dasharray="57"
    />
  </svg>
);

export default Check;
