import React from 'react';

export default function IconInstagram({ className = 'w-5 h-5', title = 'Instagram' }) {
  return (
    <svg
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.8 4.8 0 0 0 12 8.2zm6.4-2.7a1.12 1.12 0 1 1-1.12-1.12A1.12 1.12 0 0 1 18.4 5.5zM12 10.5A1.5 1.5 0 1 1 10.5 12 1.5 1.5 0 0 1 12 10.5z" />
    </svg>
  );
}
