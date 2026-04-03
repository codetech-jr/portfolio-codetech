import React from 'react';

export default function IconFacebook({ className = 'w-5 h-5', title = 'Facebook' }) {
  return (
    <svg
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8.9v-2.9h1.6V9.1c0-1.6 1-2.5 2.4-2.5.7 0 1.4.1 1.4.1v1.6h-.8c-.8 0-1 0-1 1v1.4h1.8l-.3 2.9h-1.5v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}
