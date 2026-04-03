import React from 'react';

export default function IconLinkedin({ className = 'w-5 h-5', title = 'LinkedIn' }) {
  return (
    <svg
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8.98h4.6V24H.2V8.98zM8.6 8.98h4.4v2.06h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 6.99V24h-4.6v-7.26c0-1.73-.03-3.96-2.41-3.96-2.41 0-2.78 1.88-2.78 3.83V24H8.6V8.98z" />
    </svg>
  );
}
