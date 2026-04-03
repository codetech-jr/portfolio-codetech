import React from 'react';

export default function IconEnvelope({ className = 'w-5 h-5', title = 'Email' }) {
  return (
    <svg
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
